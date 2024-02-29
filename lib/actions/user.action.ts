"use server";

import { UserProps } from "@/types";
import { connectToDatabase } from "../mongoose";
import { User } from "@/database/user.modal";
const bcrypt = require("bcrypt");

export async function createUser(params: UserProps) {
  const { name, username, email, password } = params;
  try {
    connectToDatabase();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, username, email, hashedPassword });
    return user;
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
    return user;
  } catch (error: any) {
    console.error("findUser error: ", error);
    throw new Error(error);
  }
}
