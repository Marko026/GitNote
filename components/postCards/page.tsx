"use client";
import React from "react";
import PostCard from "../postCard/PostCard";
import FilterComponentTypes from "../FilterComponentTypes/page";
import { ICreatePost } from "@/lib/validation";
import { useSession } from "next-auth/react";
import Pagination from "../shared/Pagination";

const PostCards = ({
  posts,
  totalPage,
}: {
  posts: ICreatePost[];
  totalPage: number;
}) => {
  const { data: userDetails } = useSession();
  if (!userDetails) return null;

  return (
    <section className="w-full flex flex-col mt-10 space-y-5 px-7">
      <div className="flex flex-col w-full">
        <h1 className="h1-bold">Hello {userDetails?.name},</h1>
        <p className="paragraph-1-regular">
          Time to jot down your latest learnings today!
        </p>
      </div>
      {/* //TODO: Work tracking data */}
      <div className="w-full h-44 bg-black-700"></div>

      <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row justify-between w-full">
        <h2 className="h2-bold">PostCard</h2>

        <FilterComponentTypes />
      </div>
      {posts &&
        posts.map((post: any) => <PostCard key={post._id} post={post} />)}

      {posts.length > 0 && <Pagination totalPages={totalPage} />}
    </section>
  );
};

export default PostCards;
