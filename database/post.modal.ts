import { Schema, models, model, Document } from "mongoose";

const resourcesSchema = new Schema({
  label: String,
  link: String,
});

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  createType: {
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
  resources: {
    type: [resourcesSchema],
  },
});

export const Post = models.Post || model("Post", postSchema);
