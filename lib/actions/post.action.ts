"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import { IPost, Post } from "@/database/post.model";

export async function createPost(params: IPost) {
  const { title, postType, tags, description, lessons, codeSnippet, content, resources } = params;

  try {
    await connectToDatabase();
    const post = await Post.create({
      title,
      postType,
      tags,
      description,
      lessons,
      codeSnippet,
      content,
      resources,
    });
    revalidatePath("/home");
    return JSON.parse(JSON.stringify(post));
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
export async function getAllPosts() {
  try {
    await connectToDatabase();
    const posts = await Post.find().lean();
    return posts;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getPostById(params: { id: string }) {
  try {
    await connectToDatabase();
    const { id } = params;
    if (!id) throw new Error("Id is required");
    const post = await Post.findById({ _id: id }).lean();
    if (!post) throw new Error("Post not found");
    return post;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
