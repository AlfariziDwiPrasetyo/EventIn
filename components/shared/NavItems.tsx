"use client";
import { headerLinks } from "@/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItems = ({ ...restProps }) => {
  const pathname = usePathname();

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks.map((link) => {
        const isActive = pathname == link.route;
        return (
          <li
            key={link.route}
            className={`${
              isActive && "text-primary"
            } p-medium-16 whitespace-nowrap flex-center`}
          >
            <Link href={link.route} {...restProps}>
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
