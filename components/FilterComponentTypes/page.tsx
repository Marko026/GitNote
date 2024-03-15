import React from "react";
import { PostType } from "@/constants";
import Image from "next/image";
import { Button } from "../ui/button";

const FilterComponentTypes = () => {
  return (
    <div className="flex items-center gap-4">
      {PostType.map((type) => (
        <Button key={type.value} className="flex gap-3  hover:bg-black-600">
          <Image src={`${type.image}`} alt={type.label} width={14} height={14} />
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
