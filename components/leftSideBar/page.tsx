"use client";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
import { ICreatePost } from "@/lib/validation";
import { extractKeywords } from "@/lib/utils";
import { PostType } from "@/constants";
import { Dialog } from "../Dialog/Dialog";

const LeftSideBar = ({ recentPosts }: { recentPosts: ICreatePost[] }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (pathname.includes("/postDetails")) {
      setIsOpen(false);
    }
  }, [pathname]);

  return (
    <div className="lg:flex xl:min-w-72  hidden bg-black-800  px-7 min-h-screen">
      <div className="w-full">
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
        <div onClick={() => setIsOpen(true)}>
          <Dialog open={isOpen} setIsOpen={setIsOpen} />;
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
