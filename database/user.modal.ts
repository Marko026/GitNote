import { Schema, models, model, Document } from "mongoose";

export interface UserProps extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
});

export const User = models.User || model("User", userSchema);
