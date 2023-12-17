"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChatCompletionUserMessageParam } from "openai/resources/index.mjs";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";

// components
import {
  Heading,
  NoDataAvailable,
  Loader,
  UserAvatar,
  BotAvatar,
} from "@/components/atoms";
import {
  Input,
  Button,
  Form,
  FormField,
  FormItem,
  FormControl,
} from "@/components/ui";

// hooks
import { useModal } from "@/hooks";

// icons
import { Code } from "lucide-react";

// utils & constants
import { formSchema } from "./constants";
import { cn } from "@/lib/utils";

const defaultValues = {
  prompt: "",
};

const CodeGenerationPage = () => {
  const router = useRouter();
  const modal = useModal();
  const [messages, setMessages] = useState<
    ChatCompletionUserMessageParam[] | any[]
  >([]);

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
            placeholder="JavaScript code to calculate the area of a circle"
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

      const res = await axios.post("/api/code", {
        messages: newMessages,
      });

      setMessages((current) => [res?.data, userMessage, ...current]);

      form.reset();
    } catch (error: any) {
      console.error("onSubmit", error);
      if (error?.response?.status === 403) {
        modal.onOpen();
      } else {
        toast.error("something went wrong");
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Code Generation"
        description="generate code using descriptive text"
        icon={Code}
        iconColor="text-blue-700"
        bgColor="bg-blue-700/10"
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
            <NoDataAvailable label="No conversation started" />
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
                  <ReactMarkdown
                    components={{
                      pre: ({ node, ...props }) => (
                        <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                          <pre {...props} />
                        </div>
                      ),
                      code: ({ node, ...props }) => (
                        <code
                          className="bg-black/10 rounded-lg p-1"
                          {...props}
                        />
                      ),
                    }}
                    className="text-sm overflow-hidden leading-7"
                  >
                    {message?.content}
                  </ReactMarkdown>
                  {/* <p className="text-sm">{}</p> */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeGenerationPage;
