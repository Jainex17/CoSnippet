import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { handlers } from "@/auth"
import prisma from "@/utils/prisma"

export const { GET, POST } = handlers

export const { auth } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      
      const email = user.email ?? "";
      const name = user.name ?? "";
      const picture = user.image ?? "";
      if(email === "" || name === "" || picture === "") {
        return false
      }

      const currentUser = await prisma.user.findUnique({
        where: { email },
      });

      if (!currentUser) {
        await prisma.user.create({
          data: {
            email,
            name,
            picture,
          },
        });
      }

      return true
    },
  },
})