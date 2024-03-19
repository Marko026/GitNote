import ComponentDetails from "@/components/componentDetails/ComponentDetails";
import KnowledgeDetails from "@/components/knowledgeDetails/KnowledgeDetails";
import WorkflowDetails from "@/components/workflowDetails/WorkflowDetails";
import { getPostById } from "@/lib/actions/post.action";
import React from "react";

export interface ParamsProps {
  id: string;
}

const PostDetails = async ({ params }: { params: ParamsProps }) => {
  const { id } = params;

  const post = await getPostById({ id });

  return (
    <div className="w-full">
      {post.postType === "Component" && <ComponentDetails post={post} />}
      {post.postType === "WorkFlow" && <WorkflowDetails post={post} />}
      {post.postType === "Knowledge" && <KnowledgeDetails post={post} />}
    </div>
  );
};

export default PostDetails;
