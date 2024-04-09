import PostCards from "@/components/postCards/page";
import { getAllPosts } from "@/lib/actions/post.action";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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
  const allPosts = await getAllPosts({ allPosts: true });

  const session = await getServerSession(authOptions);
  if (!session?.user) return null;

  return (
    <PostCards
      allPosts={allPosts.posts}
      posts={filterPosts.posts}
      totalPage={filterPosts.totalPages}
      user={session.user}
    />
  );
};

export default Home;
