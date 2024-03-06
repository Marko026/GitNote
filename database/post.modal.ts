import { Schema, models, model } from "mongoose";
import mongoose from "mongoose";

export interface IPost {
  _id: mongoose.Types.ObjectId;
  title: string;
  postType: string;
  tags: string[];
  description?: string;
  lessons?: string[];
  codeSnippet: string;
  content?: string;
  resources?: string[];
  labels?: string[];
}

const postSchema = new Schema({
  _id: { type: mongoose.Types.ObjectId, auto: true },
  title: {
    type: String,
    required: true,
  },
  postType: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  lessons: {
    type: [String],
    required: false,
  },
  codeSnippet: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  labels: {
    type: [String],
    required: false,
  },
  resources: {
    type: [String],
    required: false,
  },
});

export const Post = models.Post || model("Post", postSchema);
