import FormCreatePost from "@/components/forms/FormCreatePost";
import LeftSideBar from "@/components/leftSideBar/page";
import RightSideBar from "@/components/rightSideBar/page";
import React from "react";
import { useSession } from "next-auth/react";

const CreatePost = async () => {
  return (
    <section className="flex">
      <LeftSideBar />

      <FormCreatePost />

      <RightSideBar />
    </section>
  );
};

export default CreatePost;
