import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  path: string;
  refActive?: React.Ref<HTMLAnchorElement>;
}

export const ActiveLink = React.forwardRef<HTMLAnchorElement, props>(
  ({ className, path, refActive, ...props }, ref) => {
    return (
      <Link
        ref={refActive}
        className={cn(
          "block pr-3 pl-4 text-sm h-8 text-zinc-600 transition hover:text-zinc-900",
          refActive && "text-secondary",
          className
        )}
        href={path}
        {...props}
      />
    );
  }
);
