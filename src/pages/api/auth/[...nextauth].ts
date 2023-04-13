import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "../../../server/db/client"
import { compare } from 'bcryptjs'
import type { User } from '@prisma/client'

export default NextAuth({
    session: {
        strategy: 'jwt'
    },
    adapter: PrismaAdapter(prisma),
    providers: [
      CredentialsProvider({
        name: 'NUS Email',
        credentials: {},
        authorize: async (credential) => {
          try {
            // Step 1: Destructure and get the email and password
            const { email, password } = credential as {
              email: string
              password: string
            }
  
            // Step 2: If no credentials are provided, throw an error
            if (!credential || !email || !password) {
              throw new Error('No email or password provided')
            }
  
            // Step 3: Get the user by the email
            const adapterUser = await prisma.user.findUnique({
              where: { email },
            })
            if (!adapterUser) throw new Error('Invalid email or password')
  
            // Step 4: Type cast it to the type of User
            const account = adapterUser as User
  
            // If the account is found, challenge the hashPassword with the password
            const success = await compare(password, account.hashedPassword)
            if (!success) throw new Error('Invalid email or password')
  
            // The user object is passed to the session callback in session.data.user
            return {
              id: account.id,
              name: account.name,
              email: account.email,
              isAdmin: account.isAdmin,
            }
          } catch (e) {
            throw new Error((e as Error).message)
          }
        },
      }),
    ],
    callbacks: {
      // We need this to ensure that the client knows when to log in
      async session({ session, token }) {
        if (session && session.user && token) {
          // this part i changed id to name as a brute force approach
          session.user.id = token.sub || ''
          session.user.image = token.picture
        }

        return session
      },
  
      async jwt({ token, user }) {
        if (user) {
          token.picture = user.image
        }
        return token
      },
    },

  jwt: {
      secret: "",
      maxAge: 24 * 60 * 60, 
  },
  pages: {
      signIn: "/pages/login",
      newUser: "/pages/signup",
  },
   
})

 // callbacks: {
    //     async jwt({ token, account }) {
    //       // Persist the OAuth access_token to the token right after signin
    //       if (account) {
    //         token.accessToken = account.access_token
    //       }
    //       return token
    //     }
    //   }