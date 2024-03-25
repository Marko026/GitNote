import PostCards from "@/components/postCards/page";
import { getAllPosts } from "@/lib/actions/post.action";
import React from "react";

export interface ISearchParams {
  searchParams: {
    filterType: string;
    filterTags: string;
    page: number;
  };
}

const Explore = async ({ searchParams }: ISearchParams) => {
  const currentPage = +searchParams?.page ?? 1;

  const filterPosts = await getAllPosts({
    filterType: searchParams?.filterType,
    filterTags: searchParams?.filterTags,
    page: currentPage,
  });
  return (
    <PostCards posts={filterPosts.posts} totalPage={filterPosts.totalPages} />
  );
};

export default Explore;
