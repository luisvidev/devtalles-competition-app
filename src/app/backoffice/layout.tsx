import { auth } from "@/auth.config";
import { SideBar } from "@/components/layout/sidebar";
import { redirect } from "next/navigation";
import Image from "next/image";
import "../../styles/RaffleCardDetails.css";

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
    <>
      <header className="w-full sticky pointer-events-none inset-0 z-40 flex h-24 border border-solid bg-white p-0 headerContainer">
        <Image src="/guitar.png" width={70} height={20} alt="logo" />
        <h1 className="text-2xl font-bold">{"<ControlAltElite/>"}</h1>
      </header>
      <div className="detailPage flex p-0">
        <SideBar />
        <div className="container-principal-layaut h-full w-full">
          {children}
        </div>
      </div>
    </>
  );
}
