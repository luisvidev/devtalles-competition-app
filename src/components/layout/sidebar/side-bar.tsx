import MenuSideBar from "./menu-side-bar";

export const SideBar = () => {
  return (
    <>
      <div className="relative border border-solid border-black w-72 p-10 pointer-events-auto border-zinc-900/10">
        <MenuSideBar />
      </div>
    </>
  );
};
