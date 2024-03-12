"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import { Post } from "@/database/post.model";
import { Tags } from "@/database/tags.model";
import { ICreatePost } from "../validation";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export async function createPost(params: ICreatePost) {
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

    const databaseTags: any[] = [];

    for (const tag of tags) {
      if (ObjectId.isValid(tag.value)) {
        const newTag = await Tags.findById(tag.value);

        if (newTag) {
          databaseTags.push(newTag._id);
          continue;
        }
      }

      const createdTag = await Tags.create({ name: tag.label });

      databaseTags.push(createdTag._id);
    }

    const post = await Post.create({
      title,
      postType,
      tags: databaseTags,
      description,
      lessons,
      codeSnippet,
      content,
      resources,
    });

    revalidatePath("/createPost");
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
