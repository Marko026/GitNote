"use server";

import { connectToDatabase } from "../mongoose";

export async function createUser() {
  try {
    connectToDatabase();
  } catch (error) {}
}
