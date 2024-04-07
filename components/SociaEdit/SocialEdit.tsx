"use client";
import React from "react";
import ReusableFormField from "../shared/ReusableFormFileld";
import { z } from "zod";
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
import Image from "next/image";
import { SocialLinksSchema } from "@/lib/validation";
import { addSocialLinks } from "@/lib/actions/social.action";

const SocialEdit = () => {
  const form = useForm<z.infer<typeof SocialLinksSchema>>({
    resolver: zodResolver(SocialLinksSchema),
    defaultValues: {
      github: {
        username: "",
        socialLink: "",
      },
      linkedIn: {
        username: "",
        socialLink: "",
      },
      twitter: {
        username: "",
        socialLink: "",
      },
      instagram: {
        username: "",
        socialLink: "",
      },
      facebook: {
        username: "",
        socialLink: "",
      },
      discord: {
        username: "",
        socialLink: "",
      },
    },
  });

  async function onSubmit(values: z.infer<typeof SocialLinksSchema>) {
    await addSocialLinks(values);
  }

  return (
    <div className="bg-black-800 min-h-[300px] p-10">
      <h1 className="h1-bold">Social Media Links</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex gap-4 mt-5">
            <Image
              src="/assets/icons/shortcut.svg"
              width={21}
              height={16}
              alt="shortcut"
            />
            <ReusableFormField name="github.username" placeholder="username" />
            <ReusableFormField
              name="github.socialLink"
              placeholder="Social Link"
            />
          </div>
          <div className="flex gap-4 mt-5">
            <Image
              src="/assets/icons/shortcut.svg"
              width={21}
              height={16}
              alt="shortcut"
            />
            <ReusableFormField
              name="linkedIn.username"
              placeholder="username"
            />
            <ReusableFormField
              name="linkedIn.socialLink"
              placeholder="Social Link"
            />
          </div>
          <div className="flex gap-4 mt-5">
            <Image
              src="/assets/icons/shortcut.svg"
              width={21}
              height={16}
              alt="shortcut"
            />
            <ReusableFormField name="twitter.username" placeholder="username" />
            <ReusableFormField
              name="twitter.socialLink"
              placeholder="Social Link"
            />
          </div>
          <div className="flex gap-4 mt-5">
            <Image
              src="/assets/icons/shortcut.svg"
              width={21}
              height={16}
              alt="shortcut"
            />
            <ReusableFormField
              name="instagram.username"
              placeholder="username"
            />
            <ReusableFormField
              name="instagram.socialLink"
              placeholder="Social Link"
            />
          </div>
          <div className="flex gap-4 mt-5">
            <Image
              src="/assets/icons/shortcut.svg"
              width={21}
              height={16}
              alt="shortcut"
            />
            <ReusableFormField
              name="facebook.username"
              placeholder="username"
            />
            <ReusableFormField
              name="facebook.socialLink"
              placeholder="Social Link"
            />
          </div>
          <div className="flex gap-4 mt-5">
            <Image
              src="/assets/icons/shortcut.svg"
              width={21}
              height={16}
              alt="shortcut"
            />
            <ReusableFormField name="discord.username" placeholder="username" />
            <ReusableFormField
              name="discord.socialLink"
              placeholder="Social Link"
            />
          </div>
          <Button
            className="w-full bg-primary-500 hover:bg-black-600 hover:text-white-100 text-black-800 font-bold"
            type="submit">
            Update social
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SocialEdit;
