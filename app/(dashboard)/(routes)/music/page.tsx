"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

// components
import {
  Input,
  Button,
  Form,
  FormField,
  FormItem,
  FormControl,
} from "@/components/ui";
import { Heading, NoDataAvailable, Loader } from "@/components/atoms";

// hooks
import { useModal } from "@/hooks";

// icons
import { Music } from "lucide-react";

// utils & constants
import { formSchema } from "./constants";

const defaultValues = {
  prompt: "",
};

const MusicGenerationPage = () => {
  const router = useRouter();
  const modal = useModal();
  const [music, setMusic] = useState<string>("");

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
            placeholder="Linkin Park style drumrolls"
            {...field}
          />
        </FormControl>
      </FormItem>
    );
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("values", values);
    try {
      setMusic("");
      const res = await axios.post("/api/music", values);
      setMusic(res?.data?.audio);
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
        title="Music Generation"
        description="convert descriptive thoughts to beats and melodies"
        icon={Music}
        iconColor="text-green-500"
        bgColor="bg-green-500/10"
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
          {form?.formState?.isSubmitting ? (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          ) : !music ? (
            <NoDataAvailable label="No music generated" />
          ) : (
            <audio controls className="w-full mt-8">
              <source src={music} />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicGenerationPage;
