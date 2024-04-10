"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { Button } from "../ui/button";

const Tags = ({ tag, className, type }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (tag: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("filterTags", tag);
      params.set("page", "1");
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
          className={`paragraph-3-medium max-h-6 rounded bg-black-700 !px-2 capitalize hover:bg-black-900`}>
          {tag.name}
        </Button>
      ) : (
        <p className={`paragraph-3-medium ${className} uppercase`}>
          {tag.name}
        </p>
      )}
    </>
  );
};

export default Tags;
