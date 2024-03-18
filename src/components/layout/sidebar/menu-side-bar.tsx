"use client";
import { useEffect, useRef } from "react";
import { ActiveLink } from ".";
import { useElementBackDrop } from "@/hooks/useElementBackDrop";
import { usePathname } from "next/navigation";

import routesAdmin from "@/routes/routes.admin";

export default function MenuSideBar() {
  const pathName = usePathname();

  const activeLink = useRef<HTMLAnchorElement>(null);
  const parentRef = useRef<HTMLHeadingElement>(null);

  const menu = useElementBackDrop(parentRef);
  const hoverBackDrop = useElementBackDrop(parentRef);

  useEffect(() => {
    console.log("pathName");
    if (activeLink && activeLink.current) {
      menu.setTop(activeLink.current);
    }
  }, [activeLink.current]);

  return (
    <div>
      <h2 className="flex text-xs font-semibold text-zinc-900">Principal</h2>
      <div
        ref={parentRef}
        onMouseLeave={() => hoverBackDrop.setVisible("hidden")}
        className="relative mt-3 pl-2"
      >
        <ul
          role="list"
          className="relative border-l-4 [&>li>a]:flex [&>li>a]:items-center"
          id="landing-header"
        >
          {routesAdmin.map(({ icon: IconComponent, name, path }) => (
            <li key={path} className="">
              <ActiveLink
                refActive={pathName.includes(path) ? activeLink : null}
                onMouseEnter={(e) => hoverBackDrop.setTop(e.currentTarget)}
                path={path}
              >
                <IconComponent className="mr-2" /> {name}
              </ActiveLink>
            </li>
          ))}
        </ul>
        <div
          ref={menu.menuBackDrop}
          className="absolute left-2 top-0 transition-transform duration-500 ease-in-out w-1 h-8 bg-secondary backdrop-blur-lg rounded-md"
        ></div>
        <div
          ref={hoverBackDrop.menuBackDrop}
          className="absolute invisible top-0 left-0 w-full h-8 -z-20 transition-transform duration-300 ease-out bg-accent backdrop-blur-sm rounded"
        ></div>
      </div>
    </div>
  );
}
