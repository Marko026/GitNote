"use server";

import { UserProps } from "@/types";
import { connectToDatabase } from "../mongoose";
import { User } from "@/database/user.modal";

export async function createUser(params: UserProps) {
  const { name, username, email, password } = params;
  try {
    connectToDatabase();
    const user = await User.create({ name, username, email, password });
    return user;
  } catch (error: any) {
    console.error("createUser error: ", error);
    throw new Error(error);
  }
}
