import { Schema, models, model } from "mongoose";

export interface UserProps {
  ownerId?: string;
  name: string;
  email: string;
  password?: string;
  location?: string;
  joinedAt?: Date;
  portfolio?: string;
  learningGoals?: { title: string; isChecked: boolean }[];
  knowledge?: { title: string }[];
  techStack?: string[];
  startDate?: Date;
  endDate?: Date;
  availability?: boolean;
  onboardingCompleted?: boolean;
  image?: string;
  social?: {
    github: { username: string; socialLink: string };
    linkedIn: { username: string; socialLink: string };
    twitter: { username: string; socialLink: string };
    instagram: { username: string; socialLink: string };
    discord: { username: string; socialLink: string };
    facebook: { username: string; socialLink: string };
  };
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
    type: [{ title: String, isChecked: Boolean }],
  },
  knowledge: {
    type: [{ title: String }],
  },
  techStack: {
    type: [String],
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  availability: {
    type: Boolean,
  },
  onboardingCompleted: {
    type: Boolean,
  },
  image: {
    type: String,
  },
  social: {
    github: {
      username: String,
      socialLink: String,
    },
    linkedIn: {
      username: String,
      socialLink: String,
    },
    twitter: {
      username: String,
      socialLink: String,
    },
    instagram: {
      username: String,
      socialLink: String,
    },
    discord: {
      username: String,
      socialLink: String,
    },
    facebook: {
      username: String,
      socialLink: String,
    },
  },
});

export const User = models.User || model("User", userSchema);
