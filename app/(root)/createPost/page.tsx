import FormCreatePost from "@/components/forms/FormCreatePost";
import LeftSideBar from "@/components/leftSideBar/page";
import RightSideBar from "@/components/rightSideBar/page";
import React from "react";
import { getAllTags } from "@/lib/actions/tags.action";
import { getAllPosts } from "@/lib/actions/post.action";

const CreatePost = async () => {
  const posts = await getAllPosts();
  const tags = await getAllTags();

  return (
    <section className="flex">
      <LeftSideBar posts={posts} />

      <FormCreatePost tags={tags} />

      <RightSideBar />
    </section>
  );
};

export default CreatePost;
