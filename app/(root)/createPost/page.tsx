import FormCreatePost from "@/components/forms/FormCreatePost";
import React from "react";
import { getAllTags } from "@/lib/actions/tags.action";

const CreatePost = async () => {
  const tags = await getAllTags();

  return (
    <section className="flex w-full">
      <FormCreatePost tags={tags} type="Create" />
    </section>
  );
};

export default CreatePost;
