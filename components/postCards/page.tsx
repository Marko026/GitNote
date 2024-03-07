import { getAllPosts } from "@/lib/actions/post.action";
import React from "react";
import PostCard from "../postCard/PostCard";
import FilterComponentTypes from "../FilterComponentTypes/page";

const PostCards = async () => {
  const allPosts = await getAllPosts();

  return (
    <section className="w-full flex flex-col mt-10 space-y-5 px-7">
      <div className="flex flex-col w-full">
        <h1 className="h1-bold">Hello Nikky,</h1>
        <p className="paragraph-1-regular">Time to jot down your latest learnings today!</p>
      </div>
      {/* //TODO: Work tracking data */}
      <div className="w-full h-44 bg-black-700"></div>

      <div className="flex justify-between w-full">
        <h2 className="h2-bold">PostCard</h2>

        <FilterComponentTypes />
      </div>
      {allPosts && allPosts.map((post: any) => <PostCard key={post._id} post={post} />)}
    </section>
  );
};

export default PostCards;
