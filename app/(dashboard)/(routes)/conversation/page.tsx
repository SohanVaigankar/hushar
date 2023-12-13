"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// components
import { Heading } from "@/components/atoms";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";

// icons
import { MessageSquare } from "lucide-react";

// utils & constants
import { formSchema } from "./constants";

const defaultValues = {
  prompt: "",
};

const ConversationPage = () => {
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
  };

  return (
    <div>
      <Heading
        title="Conversation"
        description="Our most advance conversation model"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
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
        <div className="space-y-4 mt-4">Messages Content</div>
      </div>
    </div>
  );
};

export default ConversationPage;
