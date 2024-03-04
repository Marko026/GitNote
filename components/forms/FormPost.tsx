"use client";
import React from "react";
import { z } from "zod";
const formSchema = z.object({
  username: z.string().min(2).max(50),
});
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { Separator } from "@radix-ui/react-separator";
import CodeContentEditor from "../shared/CodeContentEditor/page";
import CodeSnippetEditor from "../shared/CodeSnippetEditor/page";
import { Editor } from "@tinymce/tinymce-react";
import Link from "next/link";

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
    <div className="w-full px-7 mb-20">
      <div className="mb-6">
        <h1 className="h1-bold w-full my-10 ">CreatePost</h1>
        <p className="uppercase text-white-500">Basic Information</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-6">
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
              <SelectItem value="light" className="hover:!bg-black-600 text-white-500 hover:!text-white-100">
                Light
              </SelectItem>
              <SelectItem value="dark" className="hover:!bg-black-600 text-white-500 hover:!text-white-100">
                Dark
              </SelectItem>
              <SelectItem value="system" className="hover:!bg-black-600 text-white-500 hover:!text-white-100">
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
                    <Image src="/assets/icons/close.svg" alt="close" width={6} height={6} />
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
            <FormLabel className="paragraph-3-medium">What you learned</FormLabel>
            <div className="bg-black-700 flex w-full mt-3 min-h-12 gap-2 px-3 items-center rounded ">
              <Image src="/assets/icons/check-mark.svg" alt="checkmark" width={12} height={12} />
              <p className="paragraph-3-medium">Session based authentication</p>
            </div>
          </div>

          <div className="bg-black-700 !mt-2 flex w-full min-h-12 px-3 items-center rounded ">
            <Image src="/assets/icons/check-mark.svg" alt="checkmark" width={12} height={12} />
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
            <Image src="/assets/icons/blue-plus.svg" alt="pluse" width={13} height={13} />
            <p className="paragraph-4-medium">Add checkmark</p>
          </Button>
          <Separator className="w-full bg-white-500 bg-opacity-10 my-6 h-[0.68px]" />

          <div className="flex flex-col space-y-8 !mt-0">
            <Editor
              apiKey="k1u3ltmn8ydlw7do8q51quscj02xqm6pbvu08pcm5jnlklnf"
              init={{
                height: 250,
                skin: "oxide-dark",
                content_css: "dark",
                content_style: `
            body { 
              font-family: Roboto, sans-serif; 
              font-size: 14px; 
              color: #ADB3CC; 
              background-color: #1d2032; 
            }
            body::-webkit-scrollbar {
              display: none;
            }
            pre, code 
            font-family: "Roboto, sans-serif"
            background-color: #282c34; /* Dark background for code */
            color: #abb2bf; /* Light text color for code */
            border-radius: 4px;
            padding: 5px;
          }
          `,
                menu: {
                  code: { title: "Code", items: "codesample" },
                  preview: { title: "Preview", items: "preview" },
                },
                plugins: ["code", "codesample", "preview", "paste"],
                menubar: "code preview",
                toolbar: "",
              }}
              initialValue="Paste your code here..."
            />

            <div>
              <h3 className="uppercase text-white-500 mb-3">Content</h3>
              <Editor
                apiKey="k1u3ltmn8ydlw7do8q51quscj02xqm6pbvu08pcm5jnlklnf"
                init={{
                  height: 250,
                  skin: "oxide-dark",
                  content_css: "dark",
                  content_style: `
            body { 
              font-family: Roboto, sans-serif; 
              font-size: 14px; 
              color: #ADB3CC; 
              background-color: #1d2032; 
            }
            body::-webkit-scrollbar {
              display: none;
            }
            pre, code 
            font-family: "Roboto, sans-serif"
            background-color: #282c34; /* Dark background for code */
            color: #abb2bf; /* Light text color for code */
            border-radius: 4px;
            padding: 5px;
          }
          `,
                  menubar: "",
                  plugins: ["code", "codesample", "preview", "paste", "media", "emoticons", "image", "link"],
                  toolbar:
                    " bold italic alignleft aligncenter alignright alignjustify bullist numlist  link image media emoticons",
                }}
                initialValue="Paste your code here..."
              />
            </div>
          </div>

          <Separator className="w-full bg-white-500 bg-opacity-10 my-6 h-[0.68px]" />

          <div>
            <p className="text-white-500 uppercase">RESOURCES & LINKS</p>
            <FormLabel className="paragraph-3-medium">Label</FormLabel>
            <Link href="" className="text-white-300 hover:underline cursor-pointer">
              <Badge className="rounded bg-black-600 flex gap-1.5">
                <p>React</p>
              </Badge>
            </Link>
          </div>

          <div className="!mt-2 flex justify-between gap-3 w-full min-h-12 items-center rounded ">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-3/5">
                  <FormControl>
                    <Input
                      placeholder="Label"
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
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-3/5">
                  <FormControl>
                    <Input
                      placeholder="Resource Link"
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
            <Image src="/assets/icons/blue-plus.svg" alt="pluse" width={13} height={13} />
            <p className="paragraph-4-medium">Add checkmark</p>
          </Button>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default Post;
