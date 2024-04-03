"use server";

import { connectToDatabase } from "../mongoose";
import { User, UserProps } from "@/database/user.model";
import { IOnBoarding } from "../validation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const bcrypt = require("bcrypt");

export async function createUser(params: UserProps) {
  const { name, email, password } = params;
  try {
    connectToDatabase();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    return JSON.parse(JSON.stringify(user));
  } catch (error: any) {
    console.error("createUser error: ", error);
    throw new Error(error);
  }
}

export async function findUser(params: { email: string }) {
  const { email } = params;
  try {
    connectToDatabase();
    const user = await User.findOne({ email: email });
    return JSON.parse(JSON.stringify(user));
  } catch (error: any) {
    console.error("findUser error: ", error);
    throw new Error(error);
  }
}

export async function compleatUserOnboarding(params: IOnBoarding) {
  const {
    email,
    learningGoals,
    knowledge,
    portfolio,
    image,
    techStack,
    startDate,
    endDate,
    availability,
  } = params;
  try {
    connectToDatabase();
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User not found");
    }

    user.learningGoals = learningGoals;
    user.image = image;
    user.knowledge = knowledge;
    user.techStack = techStack;
    user.portfolio = portfolio;
    user.startDate = startDate;
    user.endDate = endDate;
    user.onboardingCompleted = true;
    user.availability = availability;

    if (!user.onboardingCompleted && !user.acceptedTerms) {
      throw new Error(
        "User onboarding not completed and you have not accepted terms"
      );
    }
    await user.save();
    return JSON.parse(JSON.stringify(user));
  } catch (error: any) {
    console.error("compleatUserOnboarding error: ", error);
    throw new Error(error);
  }
}

export async function findUserById(params: { id: string }) {
  const { id } = params;
  try {
    connectToDatabase();
    const user = await User.findOne({
      _id: id,
    });
    return JSON.parse(JSON.stringify(user));
  } catch (error: any) {
    console.error("findUserById error: ", error);
    throw new Error(error);
  }
}

export async function updateProfile(params: IOnBoarding) {
  const {
    name,
    email,
    portfolio,
    learningGoals,
    knowledge,
    availability,
    techStack,
    startDate,
    endDate,
    image,
  } = params;

  try {
    await connectToDatabase();
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      throw new Error("User not found");
    }
    const userId = session.user.id;
    const user = await User.findOne(
      { _id: userId },
      {
        name: name,
        email: email,
        portfolio: portfolio,
        learningGoals: learningGoals,
        knowledge: knowledge,
        availability: availability,
        techStack: techStack,
        startDate: startDate,
        endDate: endDate,
        image: image,
      }
    );
    await user.save();
    return JSON.parse(JSON.stringify(user));
  } catch (error: any) {
    console.error("updateProfile error: ", error);
    throw new Error(error);
  }
}
