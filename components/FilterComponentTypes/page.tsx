"use client";

import React, { useCallback, useEffect } from "react";
import Image from "next/image";

import { PostType } from "@/constants";
import { Button } from "../ui/button";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
const FilterComponentTypes = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (type: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("filterType", type);
      params.delete("filterTags");
      params.set("page", "1");
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("type");
    router.push(`${pathname}?${params.toString()}`);
  }, []);

  return (
    <div className="flex items-center gap-4">
      {PostType.map((type) => (
        <Button
          onClick={() => {
            router.push(`${pathname}?${createQueryString(type.value)}`);
          }}
          key={type.value}
          className="flex gap-3  hover:bg-black-600">
          <Image
            src={`${type.image}`}
            alt={type.label}
            width={14}
            height={14}
          />
          <p
            className={`
            ${type.value === "WorkFlow" && "text-primary-500"}
            ${type.value === "Component" && "text-purple-500"}
            ${type.value === "Knowledge" && "text-green-500"}
          `}>
            {type.label}
          </p>
        </Button>
      ))}
    </div>
  );
};

export default FilterComponentTypes;
