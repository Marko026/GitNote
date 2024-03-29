import { Schema, models, model, Model } from "mongoose";

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
  ownerId: Schema.Types.ObjectId;
  createdAt?: Date;
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
  lessonDone: {
    type: Boolean,
    default: false,
  },
});

const postSchema = new Schema<IPost>(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

postSchema.index({ title: "text" });

export const Post =
  (models.Post as Model<IPost>) || model<IPost>("Post", postSchema);
