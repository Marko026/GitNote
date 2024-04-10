import { Schema, model, models } from "mongoose";

export interface ITags extends Document {
  _id: string;
  name: string;
  ownerId: { type: Schema.Types.ObjectId; ref: "User" };
}

const tagsSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Tags = models.Tags || model("Tags", tagsSchema);
