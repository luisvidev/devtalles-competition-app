"use client";

import { useRouter } from "next/navigation";

export const GoBackButton = () => {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.back()}>
      &lt;-Atrás
    </button>
  );
};
