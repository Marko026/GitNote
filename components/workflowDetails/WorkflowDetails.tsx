import { extractKeywords } from "@/lib/utils";
import React from "react";
import Metric from "../Metric/Metric";
import Tags from "../tags/Tags";
import ParseHtml from "../shared/ParseHtml";
import Image from "next/image";
import Link from "next/link";
export interface PostParams {
  title: string;
  description: string;
  codeSnippet: string;
  content: string;
  resources: ResourcesProps[];
  tags: TagProps[];
}
type ResourcesProps = {
  _id: string;
  label: string;
  resource: string;
};
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
      <span className="h-[1px] bg-black-600/20"></span>
      <ParseHtml data={post.content} />
      <div className="flex flex-col space-y-5">
        <h4 className="paragraph-2-bold !text-white-100">Resources & Links</h4>
        <div>
          {post.resources?.map((resource: ResourcesProps) => (
            <Link
              href={`${resource.resource}`}
              key={resource._id}
              className="flex gap-3">
              <Image
                src="/assets/icons/check-mark.svg"
                width={20}
                height={20}
                alt="check-mark"
              />
              <p className="text-white-100 hover:underline">{resource.label}</p>
              <Image
                src="/assets/icons/external-link.svg"
                width={20}
                height={20}
                alt="external-link"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowDetails;
