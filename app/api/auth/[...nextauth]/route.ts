import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/mongoose";
import { User } from "@/database/user.modal";
const bcrypt = require("bcrypt");

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
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "name" },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        try {
          await connectToDatabase();
          const user = await User.findOne({
            email: credentials?.email,
          });
          console.log("user", user);
          if (
            user &&
            user.email === credentials?.email &&
            (await bcrypt.compare(credentials?.password, user.password))
          ) {
            return user;
          } else {
            const hashedPassword = await bcrypt.hash(credentials?.password, 10);
            const newUser = await User.create({
              name: credentials?.name,
              email: credentials?.email,
              password: hashedPassword,
            });
            return newUser;
          }
        } catch (error) {
          console.log(error);
          throw new Error("Error while authorizing");
        }
      },
    }),
  ],
  callbacks: {
    async session(session: any) {
      if (session.user) {
        const sessionUser = await User.findOne({ email: session.user.email });
        session.user.id = sessionUser._id;
      }
      return session;
    },
    async signIn({ profile, account }: any) {
      if (account?.provider === "credentials") {
        return true;
      } else if (
        account?.provider === "google" ||
        account?.provider === "github"
      ) {
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
      } else {
        return false;
      }
    },
  },
  pages: {
    signIn: "/auth/signIn",
    signOut: "/auth/signOut",
  },
};
export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
