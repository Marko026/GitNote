import FormCreatePost from "@/components/forms/FormCreatePost";
import React from "react";
import { getAllTags } from "@/lib/actions/tags.action";
import { getAllPosts } from "@/lib/actions/post.action";

const CreatePost = async () => {
  const posts = await getAllPosts();
  const tags = await getAllTags();

  return (
    <section className="flex w-full">
      <FormCreatePost tags={tags} />
    </section>
  );
};

export default CreatePost;
