"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { Button } from "../ui/button";

const Tags = ({ tag, type }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (tag: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("filterTags", tag);
      return params.toString();
    },
    [searchParams]
  );

  const handleFilterTag = (tag: string) => {
    router.push(`${pathname}?${createQueryString(tag)}`);
  };

  return (
    <>
      {type === "filterTags" ? (
        <Button
          onClick={() => handleFilterTag(tag._id)}
          className="rounded paragraph-3-medium capitalize max-h-6 bg-black-700 hover:bg-black-900 !px-2">
          {tag.name}
        </Button>
      ) : (
        <p className="paragraph-3-medium uppercase">{tag.name}</p>
      )}
    </>
  );
};

export default Tags;
