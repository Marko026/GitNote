"use client";
import React, { useState } from "react";
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
import { ISocialLinks, SocialLinksSchema } from "@/lib/validation";
import { addSocialLinks } from "@/lib/actions/user.action";

type Props = {
  userSocial: any;
  onOpenChange: (value: boolean) => void;
};

const SocialEdit = ({ userSocial, onOpenChange }: Props) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof SocialLinksSchema>>({
    resolver: zodResolver(SocialLinksSchema),
    defaultValues: {
      github: {
        username: userSocial.social?.github?.username ?? "",
        socialLink: userSocial.social?.github?.socialLink ?? "",
      },
      linkedIn: {
        username: userSocial.social?.linkedIn?.username ?? "",
        socialLink: userSocial.social?.linkedIn?.socialLink ?? "",
      },
      twitter: {
        username: userSocial.social?.twitter?.username ?? "",
        socialLink: userSocial.social?.twitter?.socialLink ?? "",
      },
      instagram: {
        username: userSocial.social?.instagram?.username ?? "",
        socialLink: userSocial.social?.instagram?.socialLink ?? "",
      },
      facebook: {
        username: userSocial.social?.facebook?.username ?? "",
        socialLink: userSocial.social?.facebook?.socialLink ?? "",
      },
      discord: {
        username: userSocial.social?.discord?.username ?? "",
        socialLink: userSocial.social?.discord?.socialLink ?? "",
      },
    },
  });

  async function onSubmit(values: z.infer<typeof SocialLinksSchema>) {
    setLoading(true);
    await addSocialLinks(values);
    setLoading(false);
    onOpenChange(false);
  }

  return (
    <div className="bg-black-800 p-4 md:p-10">
      <h1 className="h1-bold">Social Media Links</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mt-5 flex  items-baseline gap-4 sm:items-center">
            <Image
              src="/assets/icons/icn-github.svg"
              width={21}
              height={16}
              alt="shortcut"
            />
            <div className="flex w-full flex-col gap-2 sm:flex-row ">
              <ReusableFormField
                name="github.username"
                placeholder="username"
              />
              <ReusableFormField
                name="github.socialLink"
                placeholder="Social Link"
              />
            </div>
          </div>
          <div className="mt-5 flex items-baseline gap-4 sm:items-center">
            <Image
              src="/assets/icons/icn-linkedin.svg"
              width={21}
              height={16}
              alt="shortcut"
            />
            <div className="flex w-full  flex-col  gap-2 sm:flex-row ">
              <ReusableFormField
                name="linkedIn.username"
                placeholder="username"
              />
              <ReusableFormField
                name="linkedIn.socialLink"
                placeholder="Social Link"
              />
            </div>
          </div>
          <div className="mt-5 flex items-baseline gap-4 sm:items-center">
            <Image
              src="/assets/icons/icn-twitter.svg"
              width={21}
              height={16}
              alt="shortcut"
            />
            <div className="flex w-full  flex-col  gap-2 sm:flex-row ">
              <ReusableFormField
                name="twitter.username"
                placeholder="username"
              />
              <ReusableFormField
                name="twitter.socialLink"
                placeholder="Social Link"
              />
            </div>
          </div>
          <div className="mt-5 flex items-baseline gap-4 sm:items-center">
            <Image
              src="/assets/icons/icn-instagram.svg"
              width={21}
              height={16}
              alt="shortcut"
            />
            <div className="flex w-full  flex-col  gap-2 sm:flex-row ">
              <ReusableFormField
                name="instagram.username"
                placeholder="username"
              />
              <ReusableFormField
                name="instagram.socialLink"
                placeholder="Social Link"
              />
            </div>
          </div>
          <div className="mt-5 flex items-baseline gap-4 sm:items-center">
            <Image
              src="/assets/icons/icn-facebook.svg"
              width={21}
              height={16}
              alt="shortcut"
            />
            <div className="flex w-full  flex-col  gap-2 sm:flex-row ">
              <ReusableFormField
                name="facebook.username"
                placeholder="username"
              />
              <ReusableFormField
                name="facebook.socialLink"
                placeholder="Social Link"
              />
            </div>
          </div>
          <div className="mt-5 flex items-baseline gap-4 sm:items-center">
            <Image
              src="/assets/icons/icn-dribbble.svg"
              width={21}
              height={16}
              alt="shortcut"
            />
            <div className="flex w-full  flex-col  gap-2 sm:flex-row ">
              <ReusableFormField
                name="discord.username"
                placeholder="username"
              />
              <ReusableFormField
                name="discord.socialLink"
                placeholder="Social Link"
              />
            </div>
          </div>
          <Button
            className="w-full bg-primary-500 font-bold text-black-800 hover:bg-black-600 hover:text-white-100"
            type="submit">
            {loading ? "Updating social..." : "Update Social"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SocialEdit;
