import { User } from "@/database/user.model"
import { connectToDatabase } from "./mongoose"
const bcrypt = require("bcrypt")
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    if (!credentials) return null

                    await connectToDatabase()
                    const user = await User.findOne({
                        email: credentials.email,
                    })

                    if (!user) return null

                    if (
                        !(await bcrypt.compare(
                            credentials?.password,
                            user.password
                        ))
                    )
                        return null

                    return user
                } catch (error) {
                    console.log(error)
                    throw new Error("Error while authorizing")
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ profile, account }: any) {
            if (
                account?.provider === "google" ||
                account?.provider === "github"
            ) {
                try {
                    await connectToDatabase()
                    const userExists = await User.findOne({
                        email: profile.email,
                    })

                    if (!userExists) {
                        await User.create({
                            name: profile.name,
                            email: profile.email,
                        })
                    }

                    return true
                } catch (error) {
                    console.error("signIn error: ", error)
                    throw new Error("Error while signing in")
                }
            }

            return true
        },
        async session({ session, token }: any) {
            try {
                await connectToDatabase()
                const user = await User.findOne({
                    email: token.email,
                })

                if (user) {
                    session.user = {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name,
                        image: user.image,
                        onboardingCompleted: user.onboardingCompleted,
                    }
                }
            } catch (error) {
                console.error("signIn error: ", error)
                throw new Error("Error while signing in")
            }

            return session
        },
    },
    pages: {
        signIn: "/login",
        signOut: "/register",
    },
}
