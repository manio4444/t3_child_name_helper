"use client";

import { Link, NavbarItem as NextuiNavbarItem } from "@nextui-org/react";
import { type PropsWithChildren } from "react";
import { usePathname } from "next/navigation";

interface INavbarItem {
  href: string;
}

export default function NavbarItem({
  href,
  children,
}: INavbarItem & PropsWithChildren) {
  const pathname = usePathname();
  const isActive = (href && pathname === href) || false;

  return (
    <NextuiNavbarItem isActive={isActive}>
      <Link
        color={(!isActive && "foreground") || undefined}
        href={href}
        aria-current={isActive && "page"}
      >
        {children}
      </Link>
    </NextuiNavbarItem>
  );
}
