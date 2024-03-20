import ReusableDetailsPage from "@/components/shared/ReusableDetailsPage";
import { getPostById } from "@/lib/actions/post.action";
import React from "react";

export interface ParamsProps {
  id: string;
}

const PostDetails = async ({ params }: { params: ParamsProps }) => {
  const { id } = params;

  const post = await getPostById({ id });

  return (
    <div className="w-full overflow-hidden lg:overflow-auto">
      {post.postType === "Component" && (
        <ReusableDetailsPage
          post={post}
          title={post.title}
          description={post.description}
          tagsList={post.tags}
          resources={post.resources}
        />
      )}
      {post.postType === "WorkFlow" && (
        <ReusableDetailsPage
          post={post}
          title={post.title}
          description={post.description}
          tagsList={post.tags}
          resources={post.resources}
        />
      )}
      {post.postType === "Knowledge" && (
        <ReusableDetailsPage
          post={post}
          title={post.title}
          lessonsList={post.lessons}
          description={post.description}
          tagsList={post.tags}
          resources={post.resources}
        />
      )}
    </div>
  );
};

export default PostDetails;
