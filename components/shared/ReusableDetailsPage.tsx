import { extractKeywords } from "@/lib/utils";
import React from "react";
import Metric from "../Metric/Metric";
import ParseHtml from "../shared/ParseHtml";
import Tags from "../tags/Tags";
import Link from "next/link";
import Image from "next/image";

type TagProps = {
  _id: string;
  name: string;
};
type ResourcesProps = {
  _id: string;
  label: string;
  resource: string;
};
export interface PostProps {
  _id: string;
  title: string;
  description: string;
  codeSnippet: string;
  content: string;
  resources: ResourcesProps[];
  tags: TagProps[];
  createdAt: string;
}
export interface PostParams {
  post: PostProps;
  title: string;
  description: string;
  tagsList: TagProps[];
  resources: ResourcesProps[];
}

const ReusableDetailsPage = ({
  post,
  title,
  description,
  tagsList,
  resources,
}: PostParams) => {
  return (
    <section className="flex flex-col p-8 space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="h1-bold capitalize">{extractKeywords(title)}</h1>
        <p className="text-white-100">SelectComponent</p>
      </div>
      <p className="">{description}</p>

      <Metric post={post} />

      <div className="flex gap-3">
        {tagsList?.map((tag: TagProps) => (
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
      <div className="flex flex-col space-y-5">
        <h4 className="paragraph-2-bold !text-white-100">Resources & Links</h4>
        <div>
          {resources?.map((resource: ResourcesProps) => (
            <Link
              href={`${resource.resource}`}
              key={resource._id}
              className="flex gap-3 items-center space-y-2">
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

export default ReusableDetailsPage;
