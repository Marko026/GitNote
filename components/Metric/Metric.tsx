import { formatDate } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { PostProps } from "../shared/ReusableDetailsPage";

export interface MetricProps {
  post: PostProps;
}

const Metric = ({ post }: MetricProps) => {
  return (
    <div className="flex items-center gap-5">
      <div className="flex items-center gap-2">
        <Image src="/assets/icons/date.svg" width={14} height={14} alt="date" />
        <span className="paragraph-3-regular whitespace-nowrap">
          {formatDate(post.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default Metric;
