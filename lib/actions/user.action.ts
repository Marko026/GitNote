"use server"

import { connectToDatabase } from "../mongoose"
import { User, UserProps } from "@/database/user.model"
import { IEditProfile, IOnBoarding } from "../validation"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { ISocialLinks } from "../validation"
import { authOptions } from "@/lib/authOptions"

const bcrypt = require("bcrypt")

export async function createUser(params: UserProps) {
    const { name, email, password } = params
    try {
        connectToDatabase()
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })
        return JSON.parse(JSON.stringify(user))
    } catch (error: any) {
        console.error("createUser error: ", error)
        throw new Error(error)
    }
}

export async function findUser(params: { email: string }) {
    const { email } = params
    try {
        connectToDatabase()
        const user = await User.findOne({ email: email })
        return JSON.parse(JSON.stringify(user))
    } catch (error: any) {
        console.error("findUser error: ", error)
        throw new Error(error)
    }
}

export async function compleatUserOnboarding(params: IOnBoarding) {
    const {
        email,
        learningGoals,
        knowledge,
        portfolio,
        image,
        techStack,
        startDate,
        endDate,
        availability,
    } = params
    try {
        connectToDatabase()
        const user = await User.findOne({ email: email })
        if (!user) {
            throw new Error("User not found")
        }

        user.learningGoals = learningGoals
        user.image = image
        user.knowledge = knowledge
        user.techStack = techStack.split(" ")
        user.portfolio = portfolio
        user.startDate = startDate
        user.endDate = endDate
        user.onboardingCompleted = true
        user.availability = availability

        if (!user.onboardingCompleted && !user.acceptedTerms) {
            throw new Error(
                "User onboarding not completed and you have not accepted terms"
            )
        }
        await user.save()
        return JSON.parse(JSON.stringify(user))
    } catch (error: any) {
        console.error("compleatUserOnboarding error: ", error)
        throw new Error(error)
    }
}

export async function findUserById(params: { id: string }) {
    const { id } = params
    try {
        connectToDatabase()
        const user = await User.findOne({
            _id: id,
        })
        return JSON.parse(JSON.stringify(user))
    } catch (error: any) {
        console.error("findUserById error: ", error)
        throw new Error(error)
    }
}

export async function updateProfile(params: IEditProfile) {
    const {
        name,
        email,
        portfolio,
        learningGoals,
        knowledge,
        availability,
        techStack,
        startDate,
        endDate,
        image,
    } = params

    try {
        await connectToDatabase()
        const session = await getServerSession(authOptions)

        if (!session?.user) {
            throw new Error("User not found")
        }
        const userId = session.user.id
        const user = await User.updateOne(
            { _id: userId },
            {
                name: name,
                email: email,
                portfolio: portfolio,
                learningGoals: learningGoals,
                knowledge: knowledge,
                availability: availability,
                techStack: techStack.map((stack) => stack.value),
                startDate: startDate,
                endDate: endDate,
                image: image,
            }
        )
        revalidatePath("/profile")
        return JSON.parse(JSON.stringify(user))
    } catch (error: any) {
        console.error("updateProfile error: ", error)
        throw new Error(error)
    }
}

export async function addSocialLinks(params: ISocialLinks) {
    const { github, linkedIn, twitter, instagram, discord, facebook } = params
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        throw new Error("User not found")
    }
    try {
        await connectToDatabase()
        const findUser = await User.findOne({ email: session.user.email })
        if (!findUser) {
            throw new Error("User not found")
        }
        const user = await User.updateOne(
            { email: session.user.email },
            {
                social: {
                    github: {
                        username: github.username,
                        socialLink: github.socialLink,
                    },
                    linkedIn: {
                        username: linkedIn.username,
                        socialLink: linkedIn.socialLink,
                    },
                    twitter: {
                        username: twitter.username,
                        socialLink: twitter.socialLink,
                    },
                    instagram: {
                        username: instagram.username,
                        socialLink: instagram.socialLink,
                    },
                    discord: {
                        username: discord.username,
                        socialLink: discord.socialLink,
                    },
                    facebook: {
                        username: facebook.username,
                        socialLink: facebook.socialLink,
                    },
                },
            }
        )
        revalidatePath("/profile")
        return JSON.parse(JSON.stringify(user))
    } catch (error: any) {
        console.log("addSocialLinks error: ", error)
        throw new Error(error)
    }
}
