import FormCreatePost from "@/components/forms/FormCreatePost";
import { getPostById } from "@/lib/actions/post.action";
import { getAllTags } from "@/lib/actions/tags.action";
import React from "react";

const UpdatePost = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const postToUpdate = await getPostById({ id });
  const allTags = await getAllTags();

  return (
    <section className="flex w-full">
      {<FormCreatePost post={postToUpdate} tags={allTags} />}
    </section>
  );
};

export default UpdatePost;
