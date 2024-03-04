import { Schema, models, model, Document } from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});
