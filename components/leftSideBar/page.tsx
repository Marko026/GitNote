"use client";
import React from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";

const LeftSideBar = () => {
  return (
    <div className="flex w-1/3 bg-black-800 px-7 min-h-screen">
      <div>
        <Image src="/assets/icons/logo.svg" alt="logo" width={100} height={24} className="mt-10 mb-12" />
        <Button className=" mb-4 flex items-center gradient w-full gap-1">
          <Image src="/assets/icons/plus.svg" alt="plus" width={14} height={14} />
          <p className="mt-[2px]">Create Post</p>
        </Button>

        <div className="flex items-center border border-transparent focus-within:border-white-500 bg-black-700 rounded justify-between px-2">
          <Image src="/assets/icons/search.svg" alt="search" width={10} height={10} />
          <Input placeholder="Search..." className="bg-transparent border-none text-white-300 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0" />
          <Image src="/assets/icons/shortcut.svg" width={21} height={16} alt="shortcut" />
        </div>
        <Separator className="w-full bg-white-500 bg-opacity-30 my-6 h-[0.68px]" />
        <div>
          <h4 className="text-white-500 mb-5">Posts</h4>
          <div className="flex flex-col space-y-5">
            {Array.from({ length: 5 }).map((item, idx) => (
              <Link href="" key={idx} className="flex gap-2">
                <Image src="/assets/icons/pc.svg" width={13} height={13} alt="pc" />
                <p className="paragraph-3-medium">Mobile Navigation</p>
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
                <Image src="/assets/icons/pc.svg" width={13} height={13} alt="pc" className="grayscale" />
                <p className="paragraph-3-medium">Mobile Navigation</p>
              </Link>
            ))}
          </div>
        </div>
        <Button onClick={() => signOut({ callbackUrl: "/login" })} className="w-full !pl-0 bg-transparent hover:bg-black-700 flex justify-start gap-3 paragraph-3-medium">
          <Image src={"/assets/icons/logout.svg"} alt="logout" width={20} height={20} />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default LeftSideBar;
