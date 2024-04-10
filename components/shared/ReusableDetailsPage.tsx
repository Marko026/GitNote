import { extractKeywords } from "@/lib/utils";
import React from "react";
import Metric from "../Metric/Metric";
import ParseHtml from "../shared/ParseHtml";
import Tags from "../tags/Tags";
import Link from "next/link";
import Image from "next/image";
import DropDown from "./DropDown";
import TaskCheckList from "../TaskCheckList/TaskCheckList";

type TagProps = {
  _id: string;
  name: string;
};
type ResourcesProps = {
  _id: string;
  label: string;
  resource: string;
};
type LessonProps = {
  _id: string;
  title: string;
  lessonDone: boolean;
};
export interface PostProps {
  _id: string;
  title: string;
  postType: string;
  description: string;
  codeSnippet: string;
  content: string;
  resources: ResourcesProps[];
  lessons: LessonProps[];
  tags: TagProps[];
  createdAt: string;
}

export interface PostParams {
  post: PostProps;
  title: string;
  description: string;
  lessonsList?: LessonProps[];
  tagsList: TagProps[];
  resources: ResourcesProps[];
}

const ReusableDetailsPage = ({
  post,
  title,
  description,
  tagsList,
  lessonsList,
  resources,
}: PostParams) => {
  return (
    <section className="flex flex-col space-y-5 p-8">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center md:gap-0 ">
        <h1 className="h1-bold capitalize">{extractKeywords(title)}</h1>
        <div className="flex items-center justify-between gap-2">
          <div
            className={`
            flex  gap-2 
            ${post.postType === "Component" && "bg-purple-500/10"}
            ${post.postType === "WorkFlow" && "bg-primary-500/10"}
            ${post.postType === "Knowledge" && "bg-green-500/10"}
            rounded px-4 py-1
          
          `}>
            <Image
              src={`/assets/icons/${post.postType.toLowerCase()}.svg`}
              width={14}
              height={14}
              alt="component"
            />
            <p
              className={` text-[14px]
              ${post.postType === "Component" && "text-purple-500"}
              ${post.postType === "WorkFlow" && "text-primary-500"}
              ${post.postType === "Knowledge" && "text-green-500"} 
            `}>
              {post.postType}
            </p>
          </div>
          <DropDown postId={post._id} />
        </div>
      </div>
      <p className="">{description}</p>

      <Metric post={post} />

      {post.postType === "WorkFlow" && (
        <div className="flex gap-3">
          {tagsList?.map((tag: TagProps) => (
            <Tags
              className="mt-2 rounded bg-black-700 px-2 py-1 capitalize"
              key={tag._id}
              tag={tag}
            />
          ))}
        </div>
      )}

      {post.postType === "WorkFlow" && <TaskCheckList post={post} />}

      {post.postType !== "WorkFlow" && (
        <div className="flex gap-3">
          {tagsList?.map((tag: TagProps) => (
            <Tags
              className="mt-2 rounded bg-black-700 px-2 py-1 capitalize"
              key={tag._id}
              tag={tag}
            />
          ))}
        </div>
      )}
      {post.postType === "Knowledge" && (
        <div>
          <h2 className="paragraph-1-bold mb-3 !text-white-100">
            Key Takeaways
          </h2>
          {lessonsList?.map((lesson: LessonProps) => (
            <div key={lesson._id} className="mb-3 flex gap-2">
              <Image
                src="/assets/icons/check-mark.svg"
                width={20}
                height={20}
                alt="check-mark"
              />
              <p className="paragraph-2">{lesson.title}</p>
            </div>
          ))}
        </div>
      )}

      <ParseHtml data={post.codeSnippet} />
      <span className="h-px bg-black-600/20"></span>
      <ParseHtml data={post.content} />
      <div className="flex flex-col space-y-5">
        <h4 className="paragraph-2-bold !text-white-100">Resources & Links</h4>
        <div>
          {resources?.map((resource: ResourcesProps) => (
            <Link
              href={`${resource.resource}`}
              key={resource._id}
              className="flex items-center gap-3 space-y-2">
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
