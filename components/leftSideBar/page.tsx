"use client";
import React from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { usePathname } from "next/navigation";
import { ICreatePost } from "@/lib/validation";
import { extractKeywords } from "@/lib/utils";
import { PostType } from "@/constants";

const LeftSideBar = ({ recentPosts }: { recentPosts: ICreatePost[] }) => {
  const pathname = usePathname();

  return (
    <div className="min-w-72 bg-black-800 hidden md:flex  px-7 min-h-screen">
      <div>
        <Link href="/home">
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            width={100}
            height={24}
            className="mt-10 mb-12"
          />
        </Link>
        {pathname !== "/createPost" && (
          <Link
            href="/createPost"
            className=" mb-4 min-h-11 rounded flex justify-center text items-center gradient w-full gap-1">
            <Image
              src="/assets/icons/plus.svg"
              alt="plus"
              width={14}
              height={14}
            />
            <p className="mt-[2px] text-white-100">Create Post</p>
          </Link>
        )}

        <div className="flex items-center border border-transparent focus-within:border-white-500 bg-black-700 rounded justify-between px-2">
          <Image
            src="/assets/icons/search.svg"
            alt="search"
            width={10}
            height={10}
          />
          <Input
            placeholder="Search..."
            className="bg-transparent border-none text-white-300 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
          />
          <Image
            src="/assets/icons/shortcut.svg"
            width={21}
            height={16}
            alt="shortcut"
          />
        </div>
        <Separator className="w-full bg-white-500 bg-opacity-30 my-6 h-[0.68px]" />
        <div>
          <h4 className="text-white-500 mb-5">Posts</h4>
          <div className="flex flex-col space-y-5">
            {recentPosts?.map((item: any, idx: any) => (
              <Link href="" key={idx} className="flex gap-2">
                <Image
                  src={
                    PostType.find((type) => type.value === item.postType)
                      ?.image || ""
                  }
                  width={13}
                  height={13}
                  alt="pc"
                />
                <p className="paragraph-3-medium line-clamp-1 capitalize">
                  {extractKeywords(item.title)}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <Separator className="w-full bg-white-500 bg-opacity-30 my-6 h-[0.68px]" />
        <div className="mb-48">
          <h5 className=" text-[12px] text-white-500 mb-5">Quick Links</h5>
          <div className="flex flex-col space-y-5">
            {Array.from({ length: 2 }).map((item, idx) => (
              <Link href="" key={idx} className="flex gap-2">
                <Image
                  src="/assets/icons/component.svg"
                  width={13}
                  height={13}
                  alt="pc"
                  className="grayscale"
                />
                <p className="paragraph-3-medium">Mobile Navigation</p>
              </Link>
            ))}
          </div>
        </div>
        <Button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full !pl-0 bg-transparent hover:bg-black-700 flex justify-start gap-3 paragraph-3-medium">
          <Image
            src={"/assets/icons/logout.svg"}
            alt="logout"
            width={20}
            height={20}
          />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default LeftSideBar;
