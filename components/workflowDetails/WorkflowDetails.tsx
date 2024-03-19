import { extractKeywords } from "@/lib/utils";
import React from "react";
import Metric from "../Metric/Metric";
import Tags from "../tags/Tags";
import ParseHtml from "../shared/ParseHtml";
import Image from "next/image";
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
const WorkflowDetails = ({ post }: { post: PostParams }) => {
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
      <div className="">
        <h4 className="paragraph-2-regular mb-3">Install shadcn</h4>
        <div className="flex items-center justify-between bg-black-800  border border-black-700 p-2 rounded-lg">
          <p className="paragraph-2-regular">Install shadcn</p>
          <Image
            src="/assets/icons/copy.svg"
            width={14}
            height={14}
            alt="copy"
            className="cursor-pointer"
          />
        </div>
      </div>

      <div className="bg-black-800 relative w-full rounded-lg focus-visible:ring-0 focus-within:border-white-500 focus-visible:ring-offset-0 focus:ring-offset-0  border border-black-700">
        <p className="paragraph-2-regular p-2">{post.content}</p>
        <Image
          src="/assets/icons/copy.svg"
          width={14}
          className="absolute right-3 top-2 oject-contain cursor-pointer"
          height={14}
          alt="copy"
        />
      </div>
    </section>
  );
};

export default WorkflowDetails;
