import LeftSideBar from "@/components/leftSideBar/page";
import PostCard from "@/components/postCard/page";
import RightSideBar from "@/components/rightSideBar/page";
import React from "react";

const Home = () => {
  return (
    <div className="flex justify-between">
      <LeftSideBar />
      <PostCard />
      <RightSideBar />
    </div>
  );
};

export default Home;
