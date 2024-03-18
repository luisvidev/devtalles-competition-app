import { useSession, signIn } from "next-auth/react";
import { SideBar } from "@/components/layout/sidebar";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import NavBar from "@/components/NavBar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "admin") {
    redirect("/auth/login");
  }

  return (
    <>
      <NavBar />
      <div className="w-full">
        <div className="grid">
          <header className="pointer-events-none inset-0 flex fixed top-16">
            <SideBar />
          </header>
          <div>
            <div className="h-full pl-72 w-auto py-5">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
