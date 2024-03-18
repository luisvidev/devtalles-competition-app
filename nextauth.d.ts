import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      image?: string; // Only available for users logged in with Discord
      accessToken?: string; // Only available for users logged in with Discord
    } & DefaultSession["user"];
  }
}
