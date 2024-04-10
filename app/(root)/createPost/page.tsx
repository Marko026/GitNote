import FormCreatePost from "@/components/forms/FormCreatePost";
import React from "react";
import { getAllTags } from "@/lib/actions/tags.action";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GitNote",
  description:
    "GitNote is a note-taking app for developers where you can write and share your knowledge with the world.",
};

const CreatePost = async () => {
  const tags = await getAllTags();

  return (
    <section className="flex w-full">
      <FormCreatePost tags={tags} type="Create" />
    </section>
  );
};

export default CreatePost;
