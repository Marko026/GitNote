import NextAuth from "next-auth/next";
import GitHubProvide from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GitHubProvide({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "   ",
    }),
  ],
  secret: process.env.NEXT_SECRET ?? " ",
};
export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
