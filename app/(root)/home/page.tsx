import LeftSideBar from "@/components/leftSideBar/page";
import PostCards from "@/components/postCards/page";
import RightSideBar from "@/components/rightSideBar/page";
import { getAllPosts } from "@/lib/actions/post.action";
import React from "react";

export interface ISearchParams {
  searchParams: {
    filterType: string;
    filterTags: string;
  };
}

const Home = async ({ searchParams }: ISearchParams) => {
  const posts = await getAllPosts({});
  const filterPosts = await getAllPosts({
    filterType: searchParams?.filterType,
    filterTags: searchParams?.filterTags,
  });

  return (
    <div className="flex justify-between">
      <LeftSideBar posts={posts} />
      <PostCards posts={filterPosts} />
      <RightSideBar />
    </div>
  );
};

export default Home;
