"use server";

import { connectToDatabase } from "../mongoose";
import { IPost, Post } from "@/database/post.model";
import { Tags } from "@/database/tags.model";
import { ICreatePost } from "../validation";
import mongoose, { FilterQuery } from "mongoose";
import { FilterInterface } from "@/types";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
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
    const session = await getServerSession(authOptions);
    const ownerId = session?.user?.id;

    if (!ownerId) throw new Error("You are not logged in.");

    const databaseTags: any[] = [];

    for (const tag of tags) {
      if (ObjectId.isValid(tag.value)) {
        const newTag = await Tags.findById(tag.value);
        if (newTag) {
          databaseTags.push(newTag._id);
          continue;
        }
      }

      const createdTag = await Tags.create({
        name: tag.label,
        ownerId: ownerId,
      });

      databaseTags.push(createdTag._id);
    }

    await Post.create({
      ownerId,
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
  const {
    filterType,
    filterTags: tagsId,
    page = 1,
    allPosts,
    searchString,
  } = params;

  try {
    await connectToDatabase();
    const session = await getServerSession(authOptions);
    const ownerId = session?.user?.id;

    if (!ownerId) throw new Error("You are not logged in.");

    let query: FilterQuery<IPost> = {
      ownerId,
    };

    if (filterType) {
      query = { ...query, postType: filterType };
    }
    if (tagsId) {
      query = { ...query, tags: tagsId };
    }
    if (searchString) {
      query = {
        ...query,
        $or: [{ title: { $regex: searchString, $options: "i" } }],
      };
    }

    const LIMIT = 4;

    const totalPages = (await Post.countDocuments(query)) / LIMIT;

    let posts;

    if (allPosts) {
      posts = await Post.find(query).sort({ createdAt: -1 }).populate("tags");
    } else {
      posts = await Post.find(query)
        .sort({ createdAt: -1 })
        .populate("tags")
        .skip((page - 1) * LIMIT)
        .limit(LIMIT);
    }

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
  const { id } = params;
  if (!id) throw new Error("Id is required you are not logged in.");
  try {
    await connectToDatabase();
    if (ObjectId.isValid(id)) {
      const post = await Post.findById(id).populate("tags");
      if (!post) throw new Error("Post not found");
      return JSON.parse(JSON.stringify(post));
    }
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
    // await connectToDatabase();
    const session = await getServerSession(authOptions);
    const ownerId = session?.user?.id;
    if (!ownerId) throw new Error("You are not logged in.");
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
      const createdTag = await Tags.create({
        name: tag.label,
        ownerId: ownerId,
      });
      databaseTags.push(createdTag._id, ownerId);
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
    const session = await getServerSession(authOptions);
    const ownerId = session?.user?.id;

    let query: FilterQuery<IPost> = {
      ownerId,
    };

    const ownerPosts = await Post.find(query).limit(8).sort({ createdAt: -1 });

    if (ownerPosts.length > 0) return JSON.parse(JSON.stringify(ownerPosts));
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function deletePost(params: { id: string }) {
  try {
    await connectToDatabase();
    const { id } = params;
    if (!id) throw new Error("Id is required");
    await Post.findByIdAndDelete({ _id: id });
    revalidatePath("/home");
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getRelatedPosts(params: { postId: string }) {
  const { postId } = params;
  await connectToDatabase();
  try {
    await connectToDatabase();
    if (ObjectId.isValid(postId)) {
      const post = await Post.findById(postId);

      if (post) {
        const relatedPosts = await Post.find({
          tags: { $in: post.tags },
        }).limit(5);
        revalidatePath(`/pageDetails/${postId}`);
        return JSON.parse(JSON.stringify(relatedPosts));
      }
    }
  } catch (error: any) {
    throw new Error(error);
  }
}
