import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (session?.user && session.user.role === "admin")
    redirect("/backoffice/raffles");

  if (session?.user && session.user.role === "user") redirect("/raffles");

  return (
    <div className="h-screen flex items-center justify-center bg-primary">
      {children}
    </div>
  );
}
