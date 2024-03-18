import LeftSideBar from "@/components/leftSideBar/page";
import RightSideBar from "@/components/rightSideBar/page";
import { getRecantPosts } from "@/lib/actions/post.action";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const recentPosts = await getRecantPosts();
  return (
    <div className="max-w-[1440px] mx-auto ">
      <div className="flex justify-between">
        <LeftSideBar recentPosts={recentPosts} />
        {children}
        <RightSideBar />
      </div>
    </div>
  );
};

export default Layout;
