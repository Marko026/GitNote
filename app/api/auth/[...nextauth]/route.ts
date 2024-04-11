import NextAuth from "next-auth/next"

import { authOptions } from "@/lib/authOptions"

type HandlerType = typeof NextAuth

declare module "next-auth" {
    interface Session {
        id: string
        name: string
    }
}

const handler: HandlerType = NextAuth(authOptions)

export { handler as GET, handler as POST }
