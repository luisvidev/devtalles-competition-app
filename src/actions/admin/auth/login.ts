"use server";

import { signIn } from "@/auth.config";
import { AuthError } from "next-auth";

export type statusLogin =
  | "success"
  | "Invalid credentials."
  | "Something went wrong.";

export async function login(
  prevState: string | undefined,
  formData: FormData
): Promise<statusLogin> {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    return "success";
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
