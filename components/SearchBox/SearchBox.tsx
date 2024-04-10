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
import { useEffect, useState, useTransition } from "react";
import { ICreatePost } from "@/lib/validation";
import { extractKeywords } from "@/lib/utils";
import { PostType } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useDebounce } from "use-debounce";

type Post = {
  posts: ICreatePost[];
};

export function SearchBox() {
  const [text, setText] = useState("");
  const [slowValue] = useDebounce(text, 700);
  const [allPosts, setAllPosts] = useState<Post>({ posts: [] });
  const [isPending, startTransition] = useTransition();

  const fetchPosts = (allPosts: boolean = true, searchString?: string) =>
    startTransition(async () => {
      const res = await getAllPosts({ allPosts, searchString });
      setAllPosts(res);
    });

  useEffect(() => {
    fetchPosts(false);
  }, []);

  useEffect(() => {
    fetchPosts(true, slowValue);
  }, [slowValue]);

  return (
    <Command className="rounded-lg shadow-md" shouldFilter={false}>
      <CommandInput
        value={text}
        onValueChange={setText}
        placeholder="Type a command or search..."
        className="paragraph-3-regular"
      />
      <CommandList className="py-2">
        {!isPending && (
          <CommandEmpty className="h-54 paragraph-3-medium flex items-center justify-center">
            No posts found please try again
          </CommandEmpty>
        )}
        <CommandGroup className="h-54 py-3 ">
          <>
            <Link
              className="paragraph-3-medium mb-2 flex gap-2 pl-5 !text-white-300/50"
              href="/explore">
              <Image
                src="/assets/icons/explore.svg"
                width={21}
                height={16}
                alt="explore-posts"
              />
              Explore all posts
            </Link>
            {isPending && (
              <p className="paragraph-3-medium text-center ">Loading...</p>
            )}
            {!isPending &&
              allPosts.posts &&
              allPosts.posts.map((post: ICreatePost) => {
                const postType = PostType.find(
                  (type) => type.value === post.postType
                );
                return (
                  <Link
                    key={post._id}
                    href={`/postDetails/${post._id}`}
                    className="group cursor-pointer">
                    <CommandItem
                      value={post.title}
                      className="mb-1 flex w-full cursor-pointer items-center px-5">
                      <Image
                        src={
                          postType?.label === post.postType
                            ? postType.image
                            : ""
                        }
                        width={16}
                        height={16}
                        alt="listImages"
                      />
                      <div className="ml-2 flex flex-col">
                        <p className="paragraph-3-regular capitalize !text-white-300 group-hover:!text-white-100">
                          {extractKeywords(post.title)}
                        </p>
                      </div>
                    </CommandItem>
                  </Link>
                );
              })}
          </>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
