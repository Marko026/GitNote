import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@/lib/mongoose";
import { User } from "@/database/user.modal";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "   ",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session(session: any) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id;
      return session;
    },
    async signIn({ profile }: any) {
      try {
        await connectToDatabase();
        const userExists = await User.findOne({
          name: profile.name,
          email: profile.email,
        });
        if (!userExists) {
          await User.create({
            name: profile.name,
            email: profile.email,
          });
        }
        return true;
      } catch (error) {
        console.error("signIn error: ", error);
        throw new Error("Error while signing in");
      }
    },
  },
};
export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
