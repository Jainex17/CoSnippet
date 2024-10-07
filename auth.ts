import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { db } from "@/utils/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
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
        console.log("Error: email, name, or picture is empty");
        return false
      }

      const username = email.split("@")[0];

      const currentUser = await db.user.findUnique({
        where: { email },
      });

      if (!currentUser) {
        await db.user.create({
          data: {
            email,
            username: username,
            nickname: name,
            picture,
          },
        });
      }

      return true
    },
  },
})