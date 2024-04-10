"use client";

import * as React from "react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { deletePost } from "@/lib/actions/post.action";

const DropDown = ({ postId }: { postId: string }) => {
  const router = useRouter();
  const id = postId;

  const handleDeletePost = async () => {
    await deletePost({ id });
    router.push("/home");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="h-7">
        <Button
          variant="ghost"
          className="border-none ring-offset-transparent  hover:bg-black-700  focus-visible:ring-transparent">
          <BsThreeDotsVertical color="#ADB3CC" size={15} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="relative right-24 mt-1 w-48  space-y-2 border-none bg-black-700">
        <DropdownMenuItem
          onClick={() => router.push(`/updatePost/${postId}`)}
          className="paragraph-3-medium flex cursor-pointer justify-center gap-2 px-2 py-3 ring-offset-transparent 
          hover:bg-black-600 hover:text-white-100 focus-visible:ring-transparent">
          <Image
            src="/assets/icons/edit.svg"
            width={12}
            height={12}
            alt="edit"
          />
          Update Post
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDeletePost}
          className="paragraph-3-medium flex cursor-pointer justify-center gap-2 px-2 py-3  ring-offset-transparent  hover:bg-black-600 hover:text-white-100 focus-visible:ring-transparent">
          <Image
            src="/assets/icons/delate.svg"
            width={12}
            height={12}
            alt="delate"
          />
          Delete Post
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
