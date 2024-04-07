"use server";

import { Social } from "@/database/social.model";
import { connectToDatabase } from "../mongoose";
import { ISocialLinks } from "../validation";

export async function addSocialLinks(params: ISocialLinks) {
  const { github, linkedIn, twitter, instagram, discord, facebook } = params;

  try {
    await connectToDatabase();
    await Social.create({
      github,
      linkedIn,
      twitter,
      instagram,
      discord,
      facebook,
    });
  } catch (error: any) {
    console.log("addSocialLinks error: ", error);
    throw new Error(error);
  }
}
