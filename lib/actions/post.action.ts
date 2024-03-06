"use server";

import { connectToDatabase } from "../mongoose";
import { IPost, Post } from "@/database/post.model";

export async function createPost(params: IPost) {
  const {
    title,
    postType,
    tags,
    description,
    lessons,
    codeSnippet,
    content,
    resources,
  } = params;

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

    return JSON.parse(JSON.stringify(post));
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
export async function getAllPosts() {
  try {
    await connectToDatabase();
    const posts = await Post.find();
    return JSON.parse(JSON.stringify(posts));
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
