"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { LogoutButton } from "./auth";
import { useEffect } from "react";
import { Avatar } from "./ui/Avatar";

const NavBar = () => {
  // TODO: remove this consoles
  const { data: session, status } = useSession();
  console.log({ session });

  useEffect(() => {
    console.log({ session });
  }, [session]);

  const handleDiscordLogin = async () => {
    await signIn("discord");
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header className="px-8 bg-primary flex justify-between items-center sticky top-0 z-10 h-16">
      <Link href="/">
        <Image src="/LOGOBLANCO.png" alt="logo" width={128} height={64} />
      </Link>
      <nav>
        <ul className="flex gap-4 text-white">
          {status === "authenticated" && session && (
            <div className="flex gap-x-4">
              <div className="flex flex-col items-end">
                <p>{session.user.email}</p>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-gray-400 underline dark:text-blue-500 hover:no-underline"
                >
                  Cerrar sesión
                </button>
              </div>
              <Avatar
                imageUrl={session.user.image}
                email={session.user.email}
              />
            </div>
          )}
          {status !== "authenticated" && (
            <button
              type="button"
              className=" flex items-center gap-x-2 text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              onClick={handleDiscordLogin}
            >
              <span>Iniciar sesión con Discord</span>
              <Image
                src="/discord-icon.png"
                alt="logo"
                width={25}
                height={25}
              ></Image>
            </button>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
