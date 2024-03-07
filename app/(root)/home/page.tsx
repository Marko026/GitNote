import LeftSideBar from "@/components/leftSideBar/page";
import PostCards from "@/components/postCards/page";
import RightSideBar from "@/components/rightSideBar/page";
import React from "react";

const Home = () => {
  return (
    <div className="flex justify-between">
      <LeftSideBar />
      <PostCards />
      <RightSideBar />
    </div>
  );
};

export default Home;
