import MenuSideBar from "./menu-side-bar";

export const SideBar = () => {
  return (
    <>
      <nav className="relative w-72 p-6 pointer-events-auto border-zinc-900/10">
        <MenuSideBar />
      </nav>
    </>
  );
};
