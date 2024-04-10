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
    if (pathname.includes("/postDetails") || pathname.includes("/explore")) {
      setIsOpen(false);
    }
  }, [pathname]);

  return (
    <div className="hidden min-h-screen  min-w-72 bg-black-800  px-7 lg:flex">
      <div className="w-full">
        <Link href="/home">
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            width={100}
            height={24}
            className="mb-12 mt-10"
          />
        </Link>
        {pathname !== "/createPost" && (
          <Link
            href="/createPost"
            className=" text gradient mb-4 flex min-h-11 w-full items-center justify-center gap-1 rounded">
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
        <Separator className="my-6 h-[0.68px] w-full bg-white-500 bg-opacity-30" />
        <div>
          <h4 className="mb-5 text-white-500">Posts</h4>
          <div className="flex flex-col space-y-5">
            {recentPosts?.map((item: any) => (
              <Link
                href={`/postDetails/${item?._id}`}
                key={item._id}
                className="flex gap-2">
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
        <Separator className="my-6 h-[0.68px] w-full bg-white-500 bg-opacity-30" />

        <Button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="paragraph-3-medium flex w-full justify-start gap-3 bg-transparent !pl-0 hover:bg-black-700">
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
