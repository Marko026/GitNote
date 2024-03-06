"use server";

import { connectToDatabase } from "../mongoose";
import { User, UserProps } from "@/database/user.model";
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
