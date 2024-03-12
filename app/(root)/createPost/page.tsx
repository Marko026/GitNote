import FormCreatePost from "@/components/forms/FormCreatePost";
import LeftSideBar from "@/components/leftSideBar/page";
import RightSideBar from "@/components/rightSideBar/page";
import React from "react";
import { getAllTags } from "@/lib/actions/tags.action";

const CreatePost = async () => {
  const tags = await getAllTags();
  return (
    <section className="flex">
      <LeftSideBar />

      <FormCreatePost tags={tags} />

      <RightSideBar />
    </section>
  );
};

export default CreatePost;
