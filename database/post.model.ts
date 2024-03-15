import { Schema, models, model, Types } from "mongoose";

export interface IPost extends Document {
  _id?: string;
  title: string;
  postType: string;
  tags: Schema.Types.ObjectId[];
  description?: string;
  lessons?: { title: string }[];
  codeSnippet?: string;
  content?: string;
  resources?: { label: string; resource: string }[];
}
const resourceSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  resource: {
    type: String,
    required: true,
  },
});

const lessonsSchema = new Schema({
  title: {
    type: String,
    required: true,
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
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tags",
    },
  ],
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
    required: false,
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
