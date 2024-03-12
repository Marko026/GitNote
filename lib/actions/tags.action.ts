import { Tags } from "@/database/tags.model";
import { connectToDatabase } from "../mongoose";

export async function getAllTags() {
  try {
    await connectToDatabase();
    const tags = await Tags.find({});
    return JSON.parse(JSON.stringify(tags));
  } catch (error: any) {
    console.log("TAGS ERROR", error);
    throw new Error(error);
  }
}
