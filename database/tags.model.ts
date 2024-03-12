import { Schema, model, models } from "mongoose";

export interface ITags {
  _id: string;
  name: string;
}

const tagsSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Tags = models.Tags || model("Tags", tagsSchema);
