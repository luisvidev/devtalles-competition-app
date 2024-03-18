"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { LogoutButton } from "./auth";
import { useEffect } from "react";

const NavBar = () => {
  // TODO: remove this consoles
  const { data: session } = useSession();
  console.log({ session });

  useEffect(() => {
    console.log({ session });
  }, [session]);

  return (
    <header className="px-8 bg-primary flex justify-between items-center sticky top-0 z-10 h-16">
      <Link href="/">
        <Image src="/LOGOBLANCO.png" alt="logo" width={128} height={64} />
      </Link>
      <nav>
        <ul className="flex gap-4 text-white">
          <Link href="/raffles">
            <li className="hover:text-indigo-700">Sorteos</li>
          </Link>
          <Link href="/register">
            <li className="hover:text-indigo-700">Registro</li>
          </Link>
          <Link href="/login">
            <li className="hover:text-indigo-700">Login</li>
          </Link>
          <LogoutButton></LogoutButton>
          {/*
                    Final section to add team info 
                    <Link href="/register">
                        <li>About</li>
                    </Link>
                     */}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
