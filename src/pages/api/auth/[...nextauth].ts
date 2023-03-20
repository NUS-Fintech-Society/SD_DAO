import NextAuth from "next-auth"
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "../../../server/db/client"
import { loginSchema } from "./auth";
import { verify } from "argon2";

export default NextAuth({
    session: {
        strategy: 'jwt'
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            type: 'credentials',
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "text ", placeholder: "jsmith@gmail.com" },
                password: { label: "Password", type: "password" },
            },
           authorize: async(credentials, req) => {
                const creds = await loginSchema.parseAsync(credentials);
                const user = await prisma.user.findFirst({
                    where: { email: creds.email },
                  });
          
                  if (!user) {
                    return null;
                  }
          
                  const isValidPassword = await verify(user.password, creds.password);
          
                  if (!isValidPassword) {
                    return null;
                  }
                  return {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                  };
          
                // Add logic here to look up the user from the credentials supplied
                /*const res = await fetch("/your/endpoint", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                
                const user = await res.json();
                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user
                }
                */
             
            }
        }),
    ],
    callbacks: {
        jwt: async({ token, account }) => {
          // Persist the OAuth access_token to the token right after signin
          if (account) {
            token.accessToken = account.access_token
            token.id = account.id
          }
          return token
        },
        session: async ({ session, token }) => {
            if (token) {
              session.id = token.id;
            }
      
            return session;
          } 
    },

    // jwt: {
    //     secret: "anything",
    //     maxAge: 15 * 24 * 30 * 60, // 15 days
    // },
    // pages: {
    //     signIn: "/pages/login",
    //     newUser: "/pages/signup",
    // },
})