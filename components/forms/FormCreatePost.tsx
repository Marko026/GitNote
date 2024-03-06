"use client";
import React, { useRef, useState } from "react";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { Separator } from "@radix-ui/react-separator";
import { Editor } from "@tinymce/tinymce-react";
import Link from "next/link";
import { createPostSchema } from "@/lib/validation";
import { createPost } from "@/lib/actions/post.action";
import { useRouter } from "next/navigation";
import { PostType } from "@/constants";

const FormCreatePost = () => {
  const [currentLesson, setCurrentLesson] = useState("");
  const [resourceLabel, setResourceLabel] = useState("");
  const [resourceLink, setResourceLink] = useState("");

  const editorRef = useRef<any>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      postType: "WorkFlow",
      tags: [],
      description: "",
      lessons: [{ lesson: "Test" }, { lesson: "Drugi test" }],
      codeSnippet: "",
      content: "",
      labels: [],
      resources: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "lessons",
    control: form.control,
  });

  const {
    fields: resourceFields,
    append: appendResource,
    remove: removeResource,
  } = useFieldArray({
    name: "resources",
    control: form.control,
  });

  let postType = form.watch("postType");

  async function onSubmit(values: z.infer<typeof createPostSchema>) {
    try {
      await createPost({
        title: values.title,
        postType: values.postType,
        tags: values.tags,
        description: values.description,
        lessons: values.lessons,
        codeSnippet: values.codeSnippet,
        content: values.content,
        labels: values.labels,
        resources: values.resources,
      });
      router.push("/home");
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }

  const handleInputEvent = (e: React.KeyboardEvent, field: any) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (tagValue.length > 10) {
          return form.setError("tags", {
            type: "required",
            message: " Tags must be less then 10 characters.",
          });
        }
        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  };

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTags);
  };

  const addLesson = () => {
    if (currentLesson.length) {
      if (currentLesson.length > 30) {
        return form.setError("lessons", {
          type: "required",
          message: "Lessons must be less then 30 characters.",
        });
      }
      form.setValue("lessons", [...form.getValues("lessons"), currentLesson]);
      setCurrentLesson("");
    }
  };

  const addResourceLinks = () => {
    if (resourceLabel.length && resourceLink.length) {
      form.setValue("labels", [...form.getValues("labels"), resourceLabel]);
      form.setValue("resources", [...form.getValues("resources"), resourceLink]);
      setResourceLabel("");
      setResourceLink("");
    }
  };

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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-3-medium">Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your title of your post"
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

          <FormField
            control={form.control}
            name="postType"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={(value: "WorkFlow" | "Component" | "Knowledge") => form.setValue("postType", value)}>
                    <FormLabel className="paragraph-3-medium">Create Type</FormLabel>
                    <SelectTrigger
                      className={`
                        ${field.value === "WorkFlow" && "text-primary-500"}
                        ${field.value === "Component" && "text-purple-500"}
                        ${field.value === "Knowledge" && "text-green-500"}
                      w-full min-h-12 !mt-2 bg-black-700 
                      border-transparent  hover:border-white-500 focus-visible:ring-0 focus-within:border-white-500 focus-visible:ring-offset-0 focus:ring-offset-0 `}>
                      <SelectValue placeholder="Component" />
                    </SelectTrigger>
                    <SelectContent className="bg-black-700 group border border-transparent focus-within:border-white-500 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0">
                      {PostType.map((type, idx) => (
                        <div className="flex">
                          <SelectItem value={type.value} key={idx} className="hover:!bg-black-600 text-white-500 hover:!text-white-100">
                            <div className="flex items-center gap-3">
                              <Image src={type.image} alt={type.label} width={15} height={15} />
                              <p>{type.label}</p>
                            </div>
                          </SelectItem>
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="tags"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="paragraph-3-medium">Tags</FormLabel>
                <FormControl>
                  <>
                    <Input
                      onKeyDown={(e) => handleInputEvent(e, field)}
                      placeholder="Create tag"
                      className="bg-black-700 
                    text-white-100
                    min-h-12 
                    border-transparent  hover:border-white-500 focus-visible:ring-0 focus-within:border-white-500 focus-visible:ring-offset-0 focus:ring-offset-0 "
                    />
                    {field.value.length > 0 && (
                      <div className="flex justify-start items-center">
                        {field.value.map((tag: any) => (
                          <Badge onClick={() => handleTagRemove(tag, field)} key={tag} className="rounded bg-black-600 py-1.5 flex items-center gap-1 cursor-pointer">
                            {tag}
                            <Image src="/assets/icons/close.svg" className="self-start" alt="close" width={6} height={6} />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full flex-col space-y-3">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="paragraph-3-medium">Your message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your description"
                      className="bg-black-700 
                    text-white-100
                    border-transparent  hover:border-white-500 focus-visible:ring-0 focus-within:border-white-500 focus-visible:ring-offset-0 focus:ring-offset-0 "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {fields.map((item, index) => (
            <FormField
              key={item.id}
              control={form.control}
              name={`lessons.${index}.lesson`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your lesson"
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
          ))}
          <Button type="button" onClick={() => append({ lesson: "" })} className="flex w-full items-center gap-2 bg-black-600">
            <Image src="/assets/icons/blue-plus.svg" alt="pluse" width={13} height={13} />
            <p className="paragraph-4-medium">Add checkmark</p>
          </Button>

          <Separator className="w-full bg-white-500 bg-opacity-10 my-6 h-[0.68px]" />

          <div className="flex flex-col space-y-8 !mt-0">
            {postType !== "Knowledge" && (
              <FormField
                control={form.control}
                name="codeSnippet"
                render={({ field }) => (
                  <FormItem>
                    <Editor
                      apiKey="k1u3ltmn8ydlw7do8q51quscj02xqm6pbvu08pcm5jnlklnf"
                      tagName="codeSnippet"
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      onBlur={field.onBlur}
                      onEditorChange={(codeSnippet) => form.setValue("codeSnippet", codeSnippet)}
                      init={{
                        height: 250,
                        skin: "oxide-dark",
                        content_css: "dark",
                        content_style: ` body { font-family: Roboto, sans-serif; font-size: 14px;       color: #ADB3CC;  background-color: #1d2032;} body::-webkit-scrollbar {      display: none; }pre, code { font-family: "Roboto Mono", monospace;      background-color: transparent !important;  padding: 5px; } `,
                        menu: {
                          code: { title: "Code", items: "codesample" },
                          preview: { title: "Preview", items: "preview" },
                        },
                        plugins: ["code", "codesample", "preview"],
                        menubar: "code preview",
                        toolbar: "",
                      }}
                      initialValue="Paste your code here..."
                    />
                  </FormItem>
                )}
              />
            )}
            <div>
              <h3 className="uppercase text-white-500 mb-3">Content</h3>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <Editor
                      apiKey="k1u3ltmn8ydlw7do8q51quscj02xqm6pbvu08pcm5jnlklnf"
                      tagName="content"
                      onInit={(evt, editor) =>
                        // @ts-ignore
                        (editorRef.current = editor)
                      }
                      onBlur={field.onBlur}
                      onEditorChange={(content) => form.setValue("content", content)}
                      init={{
                        height: 250,
                        skin: "oxide-dark",
                        content_css: "dark",
                        content_style: ` body {   font-family: Roboto, sans-serif;    font-size: 14px;    color: #ADB3CC;   background-color: #1d2032;  }   body::-webkit-scrollbar {     display: none;   }   pre, code    font-family: "Roboto, sans-serif"   background-color: #282c34;  color: #abb2bf;  border-radius: 4px;   padding: 5px;  } `,
                        menubar: "",
                        plugins: ["code", "codesample", "preview", "media", "emoticons", "image", "link"],
                        toolbar: " bold italic alignleft aligncenter alignright alignjustify bullist numlist link image media emoticons",
                      }}
                      initialValue="Paste your code here..."
                    />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator className="w-full bg-white-500 bg-opacity-10 my-6 h-[0.68px]" />

          <h4 className="text-white-500 uppercase mb-7">RESOURCES & LINKS</h4>
          {form.getValues("labels").map((label, index) => (
            <div key={index} className="bg-black-700 rounded px-3 mb-3">
              <FormLabel className="paragraph-3-regular">{label}</FormLabel>
              <Link href="" className="text-white-300 hover:underline cursor-pointer">
                <p>{form.getValues("resources")[index]}</p>
              </Link>
            </div>
          ))}
          <div className="!mt-2 flex justify-between gap-3 w-full min-h-12 items-center rounded ">
            <FormField
              control={form.control}
              name="labels"
              render={({ field }) => (
                <FormItem className="w-3/5">
                  <FormControl>
                    <Input
                      onChange={(e) => setResourceLabel(e.target.value)}
                      value={resourceLabel}
                      placeholder="Label"
                      className="bg-black-700 
                    text-white-300 
                    border-none 
                    focus-visible:ring-0 focus-within:border-white-500 focus-visible:ring-offset-0 focus:ring-offset-0 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resources"
              render={({ field }) => (
                <FormItem className="w-3/5">
                  <FormControl>
                    <Input
                      onChange={(e) => setResourceLink(e.target.value)}
                      value={resourceLink}
                      placeholder="Resource Link"
                      className="bg-black-700 
                    text-white-300 
                    border-none 
                    focus-visible:ring-0 focus-within:border-white-500 focus-visible:ring-offset-0 focus:ring-offset-0 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="button" onClick={addResourceLinks} className="flex items-center gap-2 bg-black-600">
            <Image src="/assets/icons/blue-plus.svg" alt="pluse" width={13} height={13} />
            <p className="paragraph-4-medium">New Resource</p>
          </Button>

          <Button type="submit" className="bg-primary-500 text-black-900 font-bold">
            Create Post
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormCreatePost;
