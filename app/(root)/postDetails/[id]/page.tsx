import ReusableDetailsPage from "@/components/shared/ReusableDetailsPage";
import { getPostById } from "@/lib/actions/post.action";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "GitNote",
  description:
    "GitNote is a note-taking app for developers where you can write and share your knowledge with the world.",
};

export interface ParamsProps {
  id: string;
}

const PostDetails = async ({ params }: { params: ParamsProps }) => {
  const { id } = params;

  const post = await getPostById({ id });

  !post && <div>Post not found</div>;

  return (
    <div className="w-full overflow-hidden lg:overflow-auto">
      {post?.postType === "Component" && (
        <ReusableDetailsPage
          post={post}
          title={post.title}
          description={post.description}
          tagsList={post.tags}
          resources={post.resources}
        />
      )}
      {post?.postType === "WorkFlow" && (
        <ReusableDetailsPage
          post={post}
          title={post.title}
          description={post.description}
          tagsList={post.tags}
          resources={post.resources}
        />
      )}
      {post?.postType === "Knowledge" && (
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
