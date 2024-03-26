"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getAllPosts } from "@/lib/actions/post.action";
import { useEffect, useState } from "react";
import { ICreatePost } from "@/lib/validation";
import { extractKeywords } from "@/lib/utils";
import { PostType } from "@/constants";
import Image from "next/image";
import Link from "next/link";

type Post = {
  posts: ICreatePost[];
};

export function SearchBox() {
  const [allPosts, setAllPosts] = useState<Post>({ posts: [] });
  const [loadMorePost, setLoadMorePost] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getAllPosts({ allPosts: loadMorePost });
      setAllPosts(res);
    };
    fetchPosts();
  }, [loadMorePost]);

  return (
    <Command className="rounded-lg shadow-md">
      <CommandInput
        onValueChange={() => setLoadMorePost(true)}
        placeholder="Type a command or search..."
        className="paragraph-3-regular"
      />
      <CommandList className="py-2">
        <CommandEmpty className="h-52">No results found.</CommandEmpty>
        <CommandGroup className="py-3 h-52 ">
          {allPosts.posts &&
            allPosts.posts.map((post: ICreatePost) => {
              const postType = PostType.find(
                (type) => type.value === post.postType
              );
              return (
                <Link
                  key={post._id}
                  href={`/postDetails/${post._id}`}
                  className="cursor-pointer group">
                  <CommandItem className="flex items-center w-full mb-1 px-5 cursor-pointer">
                    <Image
                      src={
                        postType?.label === post.postType ? postType.image : ""
                      }
                      width={16}
                      height={16}
                      alt="listImages"
                    />
                    <div className="flex flex-col ml-2">
                      <p className="paragraph-3-regular capitalize !text-white-300 group-hover:!text-white-100">
                        {extractKeywords(post.title)}
                      </p>
                    </div>
                  </CommandItem>
                </Link>
              );
            })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
