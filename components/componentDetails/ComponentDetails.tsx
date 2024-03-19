import { extractKeywords } from "@/lib/utils";
import React from "react";
import Metric from "../Metric/Metric";
import ParseHtml from "../shared/ParseHtml";
import Image from "next/image";
import Tags from "../tags/Tags";

export interface PostParams {
  title: string;
  description: string;
  codeSnippet: string;
  content: string;
  tags: TagProps[];
}
type TagProps = {
  _id: string;
  name: string;
};

const ComponentDetails = ({ post }: { post: PostParams }) => {
  return (
    <section className="w-full p-8 flex flex-col space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="h1-bold capitalize">{extractKeywords(post.title)}</h1>
        <p className="text-white-100">SelectComponent</p>
      </div>
      <p className="text-white-100">{post.description}</p>
      <Metric />
      <div className="flex gap-3">
        {post.tags?.map((tag: TagProps) => (
          <Tags
            className="bg-black-700 px-2 mt-2 py-1 rounded capitalize"
            key={tag._id}
            tag={tag}
          />
        ))}
      </div>
      <ParseHtml data={post.codeSnippet} />
      <span className="h-[1px] bg-black-600/20"></span>
      <ParseHtml data={post.content} />
    </section>
  );
};

export default ComponentDetails;
