import FormCreatePost from "@/components/forms/FormCreatePost";
import { getPostById } from "@/lib/actions/post.action";
import { getAllTags } from "@/lib/actions/tags.action";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "GitNote",
  description:
    "GitNote is a note-taking app for developers where you can write and share your knowledge with the world.",
};

const UpdatePost = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const postToUpdate = await getPostById({ id });
  const allTags = await getAllTags();

  return (
    <section className="flex w-full">
      {<FormCreatePost post={postToUpdate} tags={allTags} type="Update" />}
    </section>
  );
};

export default UpdatePost;
