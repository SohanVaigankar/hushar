"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

// components
import { Heading, NoDataAvailable, Loader } from "@/components/atoms";

import {
  Input,
  Button,
  Card,
  CardFooter,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Form,
  FormField,
  FormItem,
  FormControl,
} from "@/components/ui";

// icons
import { ImageIcon, Download } from "lucide-react";

// utils & constants
import { formSchema, quantityOptions, resolutionOptions } from "./constants";

const defaultValues = {
  prompt: "",
  quantity: "1",
  resolution: "512x512",
};

const ImageGenerationPage = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleRender = (field: any) => {
    if (!field) return null;
    console.log(field);
    switch (field?.name) {
      case "prompt":
        return (
          <FormItem className="col-span-12 lg:col-span-12">
            <FormControl className="m-0 p-0">
              <Input
                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                disabled={form?.formState?.isSubmitting}
                placeholder="A yellow colored pigeon"
                {...field}
              />
            </FormControl>
          </FormItem>
        );
      case "quantity":
        return (
          <FormItem className="col-span-12 lg:col-span-6">
            <Select
              disabled={form?.formState?.isSubmitting}
              onValueChange={field?.onChange}
              value={field?.value}
              defaultValue={field?.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue defaultValue={field?.value} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {quantityOptions?.map((option) => (
                  <SelectItem key={option?.value} value={option?.value}>
                    {option?.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        );
      case "resolution":
        return (
          <FormItem className="col-span-12 lg:col-span-6">
            <Select
              disabled={form?.formState?.isSubmitting}
              onValueChange={field?.onChange}
              value={field?.value}
              defaultValue={field?.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue defaultValue={field?.value} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {resolutionOptions?.map((option) => (
                  <SelectItem key={option?.value} value={option?.value}>
                    {option?.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        );

      default:
        break;
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("values", values);
    try {
      setImages([]);
      const res = await axios.post("/api/image", values);
      const urls = res?.data?.map((image: { url: string }) => image?.url);
      setImages(urls);
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
        title="Image Generation"
        description="Describe what you'd like to see"
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
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
              <FormField
                name="quantity"
                control={form?.control}
                render={({ field }) => handleRender(field)}
              />
              <FormField
                name="resolution"
                control={form?.control}
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
            <div className="p-20">
              <Loader />
            </div>
          )}
          {images?.length === 0 && !form?.formState?.isSubmitting ? (
            <NoDataAvailable label="No images generated" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
              {images?.map((src, index) => (
                <Card key={index} className="rounded-lg overflow-hidden">
                  <div className="relative aspect-square">
                    <Image alt={`image ${index}`} fill src={src} />
                  </div>
                  <CardFooter className="p-2">
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={() => window.open(src)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerationPage;
