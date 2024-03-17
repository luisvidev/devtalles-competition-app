import NextAuth, { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

const providers = {
  credentials: "credentials",
  discord: "discord",
};

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin", // Regular users sign-in page (NOT ADMIN)
  },
  providers: [
    CredentialsProvider({
      id: providers.credentials,
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Correo electrónico",
          type: "text",
          placeholder: "admin@test.com",
        },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "******",
        },
      },
      async authorize(credentials, req) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(4) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // look for user in DB with the role admin
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase(), role: "admin" },
        });

        if (!user) throw new Error("user not fount");

        // Compare password
        if (!bcryptjs.compareSync(password, user.password)) return null;
        console.log("comparing password", { user });

        // return user
        const { password: _, ...rest } = user;
        return rest;
      },
    }),
    DiscordProvider({
      id: providers.discord,
      clientId: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      const userInDB = await prisma.user.findUnique({
        where: { email: token.email || "" },
      });

      token.role = userInDB?.role || "";
      token.id = userInDB?.id || "";

      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      if (session && session.user) {
        session.user.role = (token.role || "") as string;
        session.user.id = (token.id || "") as string;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
