import { getAllPosts } from "@/lib/actions/post.action";
import Image from "next/image";
import React from "react";

const PostCard = async () => {
  const allPost = await getAllPosts();

  return (
    <div className="w-full px-7">
      <h2 className="h2-bold">PostCard</h2>
      <article className="flex flex-col space-y-5 bg-black-700 rounded-[8px] px-9 py-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-1">
            <Image src="/assets/icons/workflow.svg" alt="workflow" width={14} height={14} />
            <h3 className="text-[14px] text-primary-500 mt-[0.5px]">WorkFlow</h3>
          </div>
          <p className="h1-medium">User Authentication with Next-Auth, Clerk, 0Auth and other Most Popular Auth Providers</p>
        </div>

        <div className="flex w-full gap-3">
          <p className="paragraph-3-medium">Middleware</p>
          <p className="paragraph-3-medium">Deployment</p>
          <p className="paragraph-3-medium">Hooks</p>
          <p className="paragraph-3-medium">React Setup</p>
        </div>
      </article>
    </div>
  );
};

export default PostCard;
