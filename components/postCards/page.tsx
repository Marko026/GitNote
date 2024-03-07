import { getAllPosts } from "@/lib/actions/post.action";
import React from "react";
import PostCard from "../postCard/PostCard";

const PostCards = async () => {
  const allPosts = await getAllPosts();

  return (
    <div className="w-full flex flex-col space-y-5 px-7">
      <h2 className="h2-bold">PostCard</h2>
      {allPosts && allPosts.map((post: any) => <PostCard key={post._id} post={post} />)}
    </div>
  );
};

export default PostCards;
