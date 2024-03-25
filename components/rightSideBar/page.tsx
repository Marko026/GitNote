"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Tags from "../tags/Tags";
import { usePathname } from "next/navigation";
import { extractIdFromPath } from "@/lib/utils";
import { getRelatedPosts } from "@/lib/actions/post.action";

interface Props {
  user: {
    name: string;
    email: string;
  };
  tags: any[];
}

const RightSideBar = ({ user, tags }: Props) => {
  const pathname = usePathname();
  const postId = extractIdFromPath(pathname);
  const [showRelatedPost, setShowRelatedPost] = useState([]);
  const isPostDetails = pathname.includes("postDetails");

  useEffect(() => {
    if (!postId) return;
    const fetchRelatedPosts = async () => {
      const relatedPosts = await getRelatedPosts({ postId });
      setShowRelatedPost(relatedPosts);
    };
    fetchRelatedPosts();
  }, [postId]);

  return (
    <div className="bg-black-800 min-w-72 min-h-screen px-7 hidden xxl:block pt-10">
      <Link href="/createPost" className="flex gap-[6px] mb-12">
        <Image
          src="/assets/images/avatar01.png"
          width={36}
          height={36}
          alt="avatar"
        />
        <div>
          <p className="paragraph-3-medium !text-white-100">{user.name}</p>
          <p className="paragraph-4-regular">{user.email}</p>
        </div>
      </Link>
      {!isPostDetails ? (
        <div>
          <h3 className="paragraph-3-bold !text-white-100 mb-4">Tags</h3>
          <div className="flex flex-col items-start space-y-4">
            {tags.map((item: any, idx: any) => (
              <Tags type="filterTags" key={idx} tag={item} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h3 className="paragraph-3-bold !text-white-100 mb-4">
            Related Posts
          </h3>
          <div className="flex flex-col items-start space-y-4">
            {showRelatedPost?.map((item: any) => (
              <p key={item._id} className="paragraph-3-medium capitalize ">
                {item.title}
              </p>
            ))}
          </div>
          <Link
            href="/createPost"
            className="flex w-full justify-center gap-2 mt-5 duration-200 bg-black-600 hover:bg-black-700 py-1.5 rounded">
            <Image
              src="/assets/icons/blue-plus.svg"
              width={16}
              height={16}
              alt="relatedPost"
              className="cursor-pointer"
            />
            <p className="paragraph-3-medium">New related post</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RightSideBar;
