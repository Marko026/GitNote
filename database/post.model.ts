import { Schema, models, model, Types } from "mongoose";

export interface IPost {
  title: string;
  postType: string;
  tags: string[];
  description?: string;
  lessons?: string[];
  codeSnippet: string;
  content?: string;
  labels?: string[];
  resources?: string[];
}

const postSchema = new Schema({
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
