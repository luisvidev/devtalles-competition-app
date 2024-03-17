import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  console.log({ session });

  if (!session?.user) {
    return redirect("/auth/login");
  }

  return <main className="min-h-screen">{children}</main>;
}
