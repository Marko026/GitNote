import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";
import "./globals.css";
import "../styles/prism.css";
import Navbar from "@/components/navbar/Navbar";
import { getRecantPosts } from "@/lib/actions/post.action";
import { authOptions } from "@/lib/authOptions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GitNote",
  description:
    "GitNote is a note-taking app for developers where you can write and share your knowledge with the world.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const recentPosts = await getRecantPosts();

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-[#10121E]`}>
        <SessionProvider session={session}>
          <main className=" mx-auto max-w-screen-xxl">
            <Navbar session={session} recentPosts={recentPosts} />
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
