"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChatCompletionUserMessageParam } from "openai/resources/index.mjs";

// components
import {
  Heading,
  NoDataAvailable,
  Loader,
  UserAvatar,
  BotAvatar,
} from "@/components/atoms";
// shadcn components
import {
  Input,
  Button,
  Form,
  FormField,
  FormItem,
  FormControl,
} from "@/components/ui";

// icons
import { Video } from "lucide-react";

// utils & constants
import { formSchema } from "./constants";
import { cn } from "@/lib/utils";

const defaultValues = {
  prompt: "",
};

const VideoGenerationPage = () => {
  const router = useRouter();

  const [messages, setMessages] = useState<ChatCompletionUserMessageParam[]>(
    []
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleRender = (field: object) => {
    return (
      <FormItem className="col-span-12 col-span-10">
        <FormControl className="m-0 p-0">
          <Input
            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
            disabled={form?.formState?.isSubmitting}
            placeholder="What's the radius of the sun?"
            {...field}
          />
        </FormControl>
      </FormItem>
    );
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("values", values);
    try {
      const userMessage: ChatCompletionUserMessageParam = {
        role: "user",
        content: values?.prompt,
      };
      const newMessages = [...messages, userMessage];

      const res = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      setMessages((current) => [res?.data, userMessage, ...current]);

      form.reset();
    } catch (error: any) {
      console.error("onSubmit", error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Video Generator"
        description="imagining the impossible with the power of AI"
        icon={Video}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => handleRender(field)}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={form?.formState?.isSubmitting}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {form?.formState?.isSubmitting && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages?.length === 0 && !form?.formState?.isSubmitting ? (
            <NoDataAvailable label="No video generated" />
          ) : (
            <div className="flex flex-col-reverse gap-y-4 ">
              {messages?.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "px-8 py-3 flex w-full items-start gap-x-8 rounded-lg",
                    message?.role === "user"
                      ? "bg-white border border-black/10"
                      : "bg-muted"
                  )}
                >
                  {message?.role === "user" ? <UserAvatar /> : <BotAvatar />}
                  <p className="text-sm">{message?.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoGenerationPage;
