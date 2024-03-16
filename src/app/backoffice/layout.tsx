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
    <div>
        <header className="w-full sticky pointer-events-none inset-0 z-40 flex h-20 border border-solid border-black bg-white p-0">
          <h1 className="flex justify-center font-bold items-center w-full">Header</h1>
        </header>
      <div className="flex min-h-full container p-0">
          <SideBar />
          <div className="container-principal-layaut flex h-full flex-col max-w-1100px">{children}</div>
      </div>
    </div>
  );
}
