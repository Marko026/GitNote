import PostCards from "@/components/postCards/page";
import { getAllPosts } from "@/lib/actions/post.action";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "GitNote",
  description:
    "GitNote is a note-taking app for developers where you can write and share your knowledge with the world.",
};

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

  const { posts, totalPages } = filterPosts;

  return <PostCards posts={posts} totalPage={totalPages} />;
};

export default Explore;
