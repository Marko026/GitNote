import LeftSideBar from "@/components/leftSideBar/page";
import RightSideBar from "@/components/rightSideBar/page";
import { getRecantPosts } from "@/lib/actions/post.action";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getAllTags } from "@/lib/actions/tags.action";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const recentPosts = await getRecantPosts();
  const session = await getServerSession(authOptions);
  const tags = await getAllTags();
  if (!session?.user) return null;
  return (
    <div className="flex">
      <LeftSideBar recentPosts={recentPosts} />
      {children}
      <RightSideBar tags={tags} user={session.user} />
    </div>
  );
};

export default Layout;
