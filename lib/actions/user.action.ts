"use server";

import { connectToDatabase } from "../mongoose";
import { User, UserProps } from "@/database/user.model";
import { IOnBoarding } from "../validation";
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
