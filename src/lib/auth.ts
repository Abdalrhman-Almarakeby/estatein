import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { omit } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { comparePasswords } from "./password-hasher";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user) {
            return null;
          }

          const isPasswordValid = await comparePasswords({
            password: credentials.password,
            salt: user.salt,
            hashedPassword: user.password,
          });

          if (!isPasswordValid) {
            return null;
          }

          return omit(user, ["password"]);
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/dashboard/auth/login",
    verifyRequest: "/dashboard/auth/verify-request",
  },
};
