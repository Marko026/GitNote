import LeftSideBar from "@/components/leftSideBar/page";
import PostCards from "@/components/postCards/page";
import RightSideBar from "@/components/rightSideBar/page";
import { getAllPosts } from "@/lib/actions/post.action";
import React from "react";

export interface ISearchParams {
  searchParams: {
    filterType: string;
    query: string;
    filterTags: string;
    page: number;
  };
}

const Home = async ({ searchParams }: ISearchParams) => {
  const filterPosts = await getAllPosts({
    filterType: searchParams?.filterType,
    query: searchParams?.query,
    filterTags: searchParams?.filterTags,
    page: searchParams?.page ? +searchParams.page : 1,
  });

  const query = searchParams?.query;
  const currentPage = +searchParams?.page || 1;

  const posts = await getAllPosts({ query });

  return (
    <div className="flex justify-between">
      <LeftSideBar posts={posts} />
      <PostCards totalPage={posts} posts={filterPosts} />
      <RightSideBar />
    </div>
  );
};

export default Home;
