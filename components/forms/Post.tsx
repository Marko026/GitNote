"use client";
import React from "react";
import { z } from "zod";
const formSchema = z.object({
  username: z.string().min(2).max(50),
});
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { Separator } from "@radix-ui/react-separator";

const Post = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="w-full px-7">
      <div className="mb-6">
        <h1 className="h1-bold w-full my-10 ">CreatePost</h1>
        <p className="uppercase text-white-500">Basic Information</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-3-medium">Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="shadcn"
                    className="bg-black-700 
                    min-h-12
                    text-white-100
                    border-transparent  hover:border-white-500 focus-visible:ring-0 focus-within:border-white-500 focus-visible:ring-offset-0 focus:ring-offset-0 "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Select>
            <FormLabel className="paragraph-3-medium">Create Type</FormLabel>
            <SelectTrigger
              className="w-full min-h-12 !mt-2 bg-black-700 
              border-transparent text-purple-500  hover:border-white-500 focus-visible:ring-0 focus-within:border-white-500 focus-visible:ring-offset-0 focus:ring-offset-0 ">
              <SelectValue placeholder="Component" />
            </SelectTrigger>
            <SelectContent className="bg-black-700 group border border-transparent focus-within:border-white-500 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0">
              <SelectItem
                value="light"
                className="hover:!bg-black-600 text-white-500 hover:!text-white-100">
                Light
              </SelectItem>
              <SelectItem
                value="dark"
                className="hover:!bg-black-600 text-white-500 hover:!text-white-100">
                Dark
              </SelectItem>
              <SelectItem
                value="system"
                className="hover:!bg-black-600 text-white-500 hover:!text-white-100">
                System
              </SelectItem>
            </SelectContent>
          </Select>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="paragraph-3-medium">Tags</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Search tags"
                    className="bg-black-700 
                    text-white-100
                    min-h-12 
                    border-transparent  hover:border-white-500 focus-visible:ring-0 focus-within:border-white-500 focus-visible:ring-offset-0 focus:ring-offset-0 "
                    {...field}
                  />
                </FormControl>
                <div className="flex justify-start items-center">
                  <Badge className="rounded bg-black-600 flex gap-1.5">
                    <p>React</p>
                    <Image
                      src="/assets/icons/close.svg"
                      alt="close"
                      width={6}
                      height={6}
                    />
                  </Badge>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full flex-col space-y-3">
            <FormLabel className="paragraph-3-medium">Your message</FormLabel>
            <Textarea className="bg-black-700 focus-visible:ring-0 text-white-100 focus-within:border-white-500 focus-visible:ring-offset-0 focus:ring-offset-0 border-transparent" />
          </div>

          <div>
            <FormLabel className="paragraph-3-medium">
              What you learned
            </FormLabel>
            <div className="bg-black-700 flex w-full mt-3 min-h-12 gap-2 px-3 items-center rounded ">
              <Image
                src="/assets/icons/check-mark.svg"
                alt="checkmark"
                width={12}
                height={12}
              />
              <p className="paragraph-3-medium">Session based authentication</p>
            </div>
          </div>

          <div className="bg-black-700 !mt-2 flex w-full min-h-12 px-3 items-center rounded ">
            <Image
              src="/assets/icons/check-mark.svg"
              alt="checkmark"
              width={12}
              height={12}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter a what you learned"
                      className="bg-black-700 
                    text-white-300 
                    border-none 
                    focus-visible:ring-0 focus-within:border-white-500 focus-visible:ring-offset-0 focus:ring-offset-0 "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="flex items-center gap-2 bg-black-600">
            <Image
              src="/assets/icons/blue-plus.svg"
              alt="pluse"
              width={13}
              height={13}
            />
            <p className="paragraph-4-medium">Add checkmark</p>
          </Button>
          <Separator className="w-full bg-white-500 bg-opacity-10 my-6 h-[0.68px]" />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default Post;
