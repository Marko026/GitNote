import LeftSideBar from "@/components/leftSideBar/page";
import PostCards from "@/components/postCards/page";
import RightSideBar from "@/components/rightSideBar/page";
import { getAllPosts } from "@/lib/actions/post.action";
import React from "react";

const Home = async () => {
  const posts = await getAllPosts();
  return (
    <div className="flex justify-between">
      <LeftSideBar posts={posts} />
      <PostCards posts={posts} />
      <RightSideBar />
    </div>
  );
};

export default Home;
