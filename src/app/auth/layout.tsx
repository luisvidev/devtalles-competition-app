import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) redirect("/backoffice/raffles");

  return (
    <div className="h-screen flex items-center justify-center bg-primary">
      {children}
    </div>
  );
}
