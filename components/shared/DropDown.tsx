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
          className="hover:bg-black-700 border-none  ring-offset-transparent  focus-visible:ring-transparent">
          <BsThreeDotsVertical color="#ADB3CC" size={15} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-black-700 space-y-2 mt-1  border-none relative right-24">
        <DropdownMenuItem
          onClick={() => router.push(`/updatePost/${postId}`)}
          className="hover:bg-black-600 flex gap-2 px-2 py-3 justify-center ring-offset-transparent 
          focus-visible:ring-transparent paragraph-3-medium hover:text-white-100">
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
          className="hover:bg-black-600 flex gap-2 px-2 py-3 justify-center  ring-offset-transparent  focus-visible:ring-transparent paragraph-3-medium hover:text-white-100">
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
