import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

// api methods
import {
  increaseApiLimit,
  checkUserApiLimit,
  checkSubscription,
} from "@/lib/apiMethods";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const freeTrial = await checkUserApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free Trial has Expired", { status: 403 });
    }

    const res = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-3.5-turbo",
    });

    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(res?.choices[0]?.message);
  } catch (error: any) {
    console.error("Conversation", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
