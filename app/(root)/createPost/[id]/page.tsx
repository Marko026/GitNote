import FormCreatePost from "@/components/forms/FormCreatePost";
import { getPostById } from "@/lib/actions/post.action";
import React from "react";

const CreateRelatedPostPage = async ({ params }: { params: any }) => {
  const { id } = params;

  const relatedPosts = await getPostById({ id });

  return (
    <section className="flex w-full">
      <FormCreatePost tags={relatedPosts.tags} type="relatedPost" />
    </section>
  );
};

export default CreateRelatedPostPage;
