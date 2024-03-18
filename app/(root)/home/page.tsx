import LeftSideBar from "@/components/leftSideBar/page";
import PostCards from "@/components/postCards/page";
import RightSideBar from "@/components/rightSideBar/page";
import { getAllPosts, getRecantPosts } from "@/lib/actions/post.action";
import React from "react";

export interface ISearchParams {
  searchParams: {
    filterType: string;
    filterTags: string;
    page: number;
  };
}

const Home = async ({ searchParams }: ISearchParams) => {
  const currentPage = +searchParams?.page ?? 1;

  const filterPosts = await getAllPosts({
    filterType: searchParams?.filterType,
    filterTags: searchParams?.filterTags,
    page: currentPage,
  });

  const posts = await getRecantPosts();

  return (
    <div className="flex justify-between">
      <LeftSideBar posts={posts} />
      <PostCards posts={filterPosts.posts} totalPage={filterPosts.totalPages} />
      <RightSideBar />
    </div>
  );
};

export default Home;
