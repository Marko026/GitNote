import { Tags } from "@/database/tags.model";
import { connectToDatabase } from "../mongoose";

export async function getAllTags(ownerId: string) {
  try {
    await connectToDatabase();

    const tags = await Tags.find({ ownerId: ownerId }).limit(10);

    return JSON.parse(JSON.stringify(tags));
  } catch (error: any) {
    console.log("TAGS ERROR", error);
    throw new Error(error);
  }
}
