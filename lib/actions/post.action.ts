"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import { Post } from "@/database/post.model";
import { Tags } from "@/database/tags.model";
import { ICreatePost } from "../validation";
import mongoose from "mongoose";
import { FilterInterface } from "@/types";
import { redirect } from "next/navigation";
import { log } from "console";
import { User } from "@/database/user.model";
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

    await Post.create({
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
export async function getAllPosts(params: FilterInterface = {}) {
  const { filterType, filterTags: tagsId, page = 1 } = params;

  try {
    await connectToDatabase();
    let query = {};

    if (filterType) {
      query = { ...query, postType: filterType };
    }
    if (tagsId) {
      query = { ...query, tags: tagsId };
    }

    const LIMIT = 2;

    const totalPages = (await Post.countDocuments(query)) / LIMIT;

    const posts = await Post.find(query)
      .populate("tags")
      .skip((page - 1) * LIMIT)
      .limit(LIMIT);
    return {
      totalPages: Math.ceil(totalPages),
      posts: JSON.parse(JSON.stringify(posts)),
    };
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
    const post = await Post.findById({ _id: id }).populate("tags");
    if (!post) throw new Error("Post not found");
    return JSON.parse(JSON.stringify(post));
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
export async function findAndUpdatePost(params: ICreatePost) {
  const {
    _id,
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
    if (!_id) throw new Error("Id is required post failed to update");
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
    await Post.findByIdAndUpdate(_id, {
      title,
      postType,
      tags: databaseTags,
      description,
      lessons,
      codeSnippet,
      content,
      resources,
    });
    revalidatePath("/home");
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getRecantPosts() {
  try {
    await connectToDatabase();

    const recentPosts = await Post.find().limit(5);

    return JSON.parse(JSON.stringify(recentPosts));
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function deletePost(params: { id: string }) {
  try {
    await connectToDatabase();
    const { id: postId } = params;
    if (!postId) throw new Error("Id is required");
    const userId = await User.findOne({ id: postId });
    console.log(userId.id);

    if (!userId) throw new Error("User not found");
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
