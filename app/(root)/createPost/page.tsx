"use client";
import LeftSideBar from "@/components/leftSideBar/page";
import RightSideBar from "@/components/rightSideBar/page";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

import React from "react";

const CreatePost = () => {
  return (
    <section className="flex">
      <LeftSideBar />
      <h1 className="h1-bold w-full mt-10 ">CreatePost</h1>

      <RightSideBar />
    </section>
  );
};

export default CreatePost;
