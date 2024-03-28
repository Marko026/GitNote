import { Schema, models, model } from "mongoose";

export interface UserProps {
  ownerId?: string;
  name: string;
  email: string;
  password: string;
  location?: string;
  joinedAt?: Date;
  portfolio?: string;
  learningGoals?: { title: string }[];
  knowledge?: { title: string }[];
  techStack?: string;
  startDate?: Date;
  endDate?: Date;
  acceptedTerms?: boolean;
}

const userSchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  portfolio: {
    type: String,
  },
  learningGoals: {
    type: [String],
  },
  knowledge: {
    type: [String],
  },
  techStack: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  acceptedTerms: {
    type: Boolean,
  },
});

export const User = models.User || model("User", userSchema);
