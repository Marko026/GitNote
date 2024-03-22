import { Schema, models, model } from "mongoose";

export interface UserAvailability {
  startDate: Date;
  endDate: Date;
  availability: boolean;
}

export interface UserProps {
  ownerId: string;
  name: string;
  email: string;
  password: string;
  location?: string;
  joinedAt?: Date;
  portfolio?: string;
  learningGoals?: string[];
  knowledge?: string[];
  techStack?: string[];
  availability?: UserAvailability[];
}

const userSchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    required: true,
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
