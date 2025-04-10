import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { openAPI } from "better-auth/plugins"

import { sendAccessTokenMail } from "@/actions/auth"
import { createUserFeatures } from "@/actions/user"
import prisma from "@/db"

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [openAPI()],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: true,
    resetPasswordTokenExpiresIn: 600,
    sendResetPassword: async ({ url, user, token }) => {
      console.log("Sending reset password email", user, token, url)
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 600,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, token }) => {
      const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`
      await sendAccessTokenMail({
        name: user.name,
        email: user.email,
        url: verificationUrl,
      })
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      display: "popup",
      prompt: "select_account",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await createUserFeatures(user.id)
        },
      },
    },
  },
})
