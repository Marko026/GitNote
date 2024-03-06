import { Schema, models, model, Document } from "mongoose";

export interface UserAvailability {
  startDate: Date;
  endDate: Date;
  availability: boolean;
}

export interface UserProps {
  nextAuthId: string;
  name: string;
  username: string;
  email: string;
  password: string;
  location: string;
  joinedAt: Date;
  portfolio: string;
  learningGoals: string[];
  knowledge: string[];
  techStack: string[];
  availability: UserAvailability[];
}

const userSchema = new Schema({
  nextAuthId: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
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
    type: [String],
  },
  availability: {
    type: [
      {
        startDate: Date,
        endDate: Date,
        availability: Boolean,
      },
    ],
  },
});

export const User = models.User || model("User", userSchema);
