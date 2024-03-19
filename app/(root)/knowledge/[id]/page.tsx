import Metric from "@/components/Metric/Metric";
import ParseHtml from "@/components/shared/ParseHtml";
import Tags from "@/components/tags/Tags";
import { getPostById } from "@/lib/actions/post.action";
import { extractKeywords } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export interface ParamsProps {
  id: string;
}
type TagProps = {
  _id: string;
  name: string;
};

const KnowledgeDetails = async ({ params }: { params: ParamsProps }) => {
  const { id } = params;

  const post = await getPostById({ id });

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

export default KnowledgeDetails;
