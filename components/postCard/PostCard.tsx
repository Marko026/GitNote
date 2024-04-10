import { PostType } from "@/constants";
import { IPost } from "@/database/post.model";
import Image from "next/image";
import Tags from "../tags/Tags";
import React from "react";
import Link from "next/link";

const PostCard = ({ post }: { post: IPost }) => {
  const postType = PostType.find((type) => type.value === post.postType);
  return (
    <Link href={`/postDetails/${post?._id}`}>
      <article className="flex min-h-[184px] flex-col justify-between space-y-5 rounded-[8px] bg-black-700 px-4 py-6 md:px-9">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-1">
            <Image
              src={postType?.image || ""}
              alt={postType?.label || ""}
              width={14}
              height={14}
            />
            <h3
              className={`
            ${postType?.value === "WorkFlow" && "text-primary-500"}
            ${postType?.value === "Component" && "text-purple-500"}
           ${postType?.value === "Knowledge" && "text-green-500"}  
             mt-[0.5px] text-[14px]`}>
              {post.postType}
            </h3>
          </div>
          <p className="h1-medium line-clamp-2 capitalize">{post.title}</p>
        </div>
        <div className="flex w-full gap-3">
          {post.tags &&
            post.tags.map((tag, index) => <Tags key={index} tag={tag} />)}
        </div>
      </article>
    </Link>
  );
};

export default PostCard;
