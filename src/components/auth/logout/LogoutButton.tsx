"use client";

import { signOut } from "next-auth/react";
import React, { useState } from "react";

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await signOut({ callbackUrl: "/auth/login" });
  };

  return (
    <button
      type="button"
      disabled={isLoading}
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      onClick={handleLogout}
    >
      {isLoading ? "Cerrando sesión..." : "Cerrar sesión"}
    </button>
  );
}
