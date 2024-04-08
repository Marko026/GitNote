import LeftSideBar from "@/components/leftSideBar/page";
import RightSideBar from "@/components/rightSideBar/page";
import { getRecantPosts } from "@/lib/actions/post.action";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getAllTags } from "@/lib/actions/tags.action";
import { findUser } from "@/lib/actions/user.action";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const recentPosts = await getRecantPosts();
  const session = await getServerSession(authOptions);

  if (!session?.user) return null;
  const findOneUser = session?.user.email;
  const findOwnerId = session?.user.id;

  const tags = await getAllTags(findOwnerId);

  const userSocialLinks = await findUser({ email: findOneUser });

  return (
    <div className="flex">
      <LeftSideBar recentPosts={recentPosts} />
      {children}
      <RightSideBar
        userSocial={userSocialLinks}
        tags={tags}
        user={session.user}
      />
    </div>
  );
};

export default Layout;
