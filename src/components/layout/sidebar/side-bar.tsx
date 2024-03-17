import LogoutButton from "@/app/backoffice/raffles/ui/LogoutButton";
import MenuSideBar from "./menu-side-bar";

export const SideBar = () => {
  return (
    <>
      <div className="relative border border-solid border-black w-72 p-10 pointer-events-auto border-zinc-900/10 rounded-lg flex flex-col justify-between max-h-96">
        <MenuSideBar />
        <LogoutButton />
      </div>
    </>
  );
};
