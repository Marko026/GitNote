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
    <section className="w-full flex flex-col mt-10 space-y-5 px-7">
      {pathname !== "/explore" && (
        <>
          <div className="flex flex-col w-full">
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
      <div
        className={` ${
          pathname === "/explore"
            ? "flex gap-4 flex-wrap"
            : "flex flex-col gap-5"
        }`}>
        {posts &&
          posts.map((post: any) => (
            <div
              key={post._id}
              className={`${
                pathname === "/explore" && "w-full md:w-[45%] flex-auto "
              }`}>
              <PostCard key={post._id} post={post} />
            </div>
          ))}
      </div>

      {posts?.length > 0 && <Pagination totalPages={totalPage} />}
    </section>
  );
};

export default PostCards;
