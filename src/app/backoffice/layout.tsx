import { auth } from "@/auth.config";
import { SideBar } from "@/components/layout/sidebar";
import { redirect } from "next/navigation";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    return redirect("/auth/login");
  }

  return (
    <div className="w-full grid">
      <div className="min-h-full ml-72">
        <header className="fixed pointer-events-none inset-0 z-40 flex">
          <SideBar />
        </header>
        <div className="relative h-full bg-background">
          <div className=" flex h-full flex-col px-4 pt-14 max-w-7xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
