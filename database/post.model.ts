import { Schema, models, model } from "mongoose";

export interface IPost {
  title: string;
  postType: string;
  tags: string[];
  description?: string;
  lessons?: { title: string }[];
  codeSnippet: string;
  content?: string;
  resources?: { label: string; resource: string }[];
}
const resourceSchema = new Schema({
  label: {
    type: String,
    required: false,
  },
  resource: {
    type: String,
    required: false,
  },
});

const tagsSchema = new Schema({
  tag: {
    type: String,
    required: false,
  },
});

const lessonsSchema = new Schema({
  title: {
    type: String,
    required: false,
  },
});

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
    type: [tagsSchema],
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  lessons: {
    type: [lessonsSchema],
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
  resources: {
    type: [resourceSchema],
    required: false,
  },
});

export const Post = models.Post || model("Post", postSchema);
