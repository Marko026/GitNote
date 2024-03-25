"use client";
import React from "react";
import PostCard from "../postCard/PostCard";
import FilterComponentTypes from "../FilterComponentTypes/page";
import { ICreatePost } from "@/lib/validation";
import Pagination from "../shared/Pagination";
import { DefaultSession } from "next-auth";
import { usePathname } from "next/navigation";

const PostCards = ({
  posts,
  totalPage,
  user,
}: {
  posts: ICreatePost[];
  totalPage: number;
  user?: DefaultSession["user"];
}) => {
  const pathname = usePathname();

  return (
    <section
      className={`w-full flex flex-col mt-10 space-y-5 px-7 ${
        pathname === "/explore" && "flex-wrap !flex-row gap-2"
      }`}>
      {pathname !== "/explore" && (
        <>
          <div className={`flex flex-col w-full`}>
            <h1 className="h1-bold">Hello {user?.name ?? "User"},</h1>
            <p className="paragraph-1-regular">
              Time to jot down your latest learnings today!
            </p>
          </div>
          <div className="w-full h-44 bg-black-700"></div>
        </>
      )}
      <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row justify-between w-full">
        <h2 className="h2-bold">PostCard</h2>

        <FilterComponentTypes />
      </div>
      {posts &&
        posts.map((post: any) => (
          <div className={`${pathname === "/explore" && "w-2/5"}`}>
            <PostCard key={post._id} post={post} />
          </div>
        ))}

      {posts?.length > 0 && <Pagination totalPages={totalPage} />}
    </section>
  );
};

export default PostCards;
