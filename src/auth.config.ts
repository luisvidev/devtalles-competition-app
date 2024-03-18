import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcryptjs from "bcryptjs";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.data = user;

      return token;
    },
    session({ session, token, user }) {
      session.user = token.data as any;
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(4) })
          .safeParse(credentials);

        console.log({ parsedCredentials });

        if (!parsedCredentials.success) return null;
        console.log("user", parsedCredentials.data);

        const { email, password } = parsedCredentials.data;

        // look for user in DB
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase(), role: "admin" },
        });
        console.log("user2", user);
        if (!user) return null;

        // Compare password
        if (!bcryptjs.compareSync(password, user.password)) return null;
        console.log("comparing password", { user });
        // return user
        const { password: _, ...rest } = user;
        return rest;
      },
    }),
  ],
};

export const { signIn, signOut, auth } = NextAuth(authConfig);
