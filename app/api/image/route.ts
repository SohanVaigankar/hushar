import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, quantity = 1, resolution = "512x512" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Image prompt is required", { status: 400 });
    }
    if (!quantity) {
      return new NextResponse("Image quantity is required", { status: 400 });
    }
    if (!resolution) {
      return new NextResponse("Image resolution is required", { status: 400 });
    }

    const res = await openai.images.generate({
      prompt,
      n: parseInt(quantity, 10),
      size: resolution,
      // model: "gpt-3.5-turbo",
    });

    console.log(res);

    return NextResponse.json(res?.data);
  } catch (error) {
    console.error("Image", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
