"use client";
import Image from "next/image";
import React, { useState } from "react";
import MobileView from "../MobileView/MobileView";
import Link from "next/link";
import { ICreatePost } from "@/lib/validation";
import { UserProps } from "@/database/user.model";
import { usePathname } from "next/navigation";

interface Props {
  recentPosts: ICreatePost[];
  session: {
    user: UserProps;
  };
}

const Navbar = ({ recentPosts, session }: Props) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <>
      {pathname !== "/onboarding" &&
        pathname !== "/login" &&
        pathname !== "/register" && (
          <div className="bg-black-800 p-5 lg:hidden">
            <div className="flex justify-between">
              <Link href="/home">
                <Image
                  src="/assets/icons/logo.svg"
                  width={100}
                  height={25}
                  alt="logo"
                />
              </Link>
              <Image
                onClick={() => setOpen((prev) => !prev)}
                src={"/assets/icons/navicon.svg"}
                width={21}
                height={21}
                alt="menu"
                className="cursor-pointer"
              />
            </div>
            <MobileView
              open={open}
              session={session}
              recentPosts={recentPosts}
              setOpen={setOpen}
            />
          </div>
        )}
    </>
  );
};

export default Navbar;
