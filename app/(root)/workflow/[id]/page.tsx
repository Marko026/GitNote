import { getPostById } from "@/lib/actions/post.action";
import React from "react";

export interface ParamsProps {
  id: string;
}

const WorkFlowDetails = async ({ params }: { params: ParamsProps }) => {
  const { id } = params;

  const post = await getPostById({ id });

  return (
    <div>
      <h1>WorkFlowDetails</h1>
    </div>
  );
};

export default WorkFlowDetails;
