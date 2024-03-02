import Post from "@/components/forms/Post";
import LeftSideBar from "@/components/leftSideBar/page";
import RightSideBar from "@/components/rightSideBar/page";

import React from "react";

const CreatePost = () => {
  return (
    <section className="flex">
      <LeftSideBar />

      <Post />

      <RightSideBar />
    </section>
  );
};

export default CreatePost;
