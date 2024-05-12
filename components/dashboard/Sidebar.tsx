"use client";
import { navItems } from "@/constants/data";
import Link from "next/link";
import React from "react";
import { Icons } from "../Icons";
import { signOutUser } from "@/app/logout/actions";

function Sidebar() {
  const handleLogout = async () => {
    await signOutUser();
  };
  return (
    <div className="h-full w-64 bg-background hidden md:block border-r-1">
      <div className="p-5 text-primary font-bold">Eventin</div>
      <ul className="space-y-2">
        {navItems.map((item, index) => {
          const Icon = Icons[item.icon];
          return (
            <li>
              <Link
                key={index}
                href={item.link}
                className="block p-4 text-sm hover:bg-primary font-medium hover:text-accent transition-colors"
              >
                <span className="flex items-center">
                  <Icon className="h-4 mr-2 w-4" />
                  {item.title}
                </span>
              </Link>
            </li>
          );
        })}
        <li>
          <span
            onClick={handleLogout}
            className="block p-4 text-sm hover:bg-primary font-medium hover:text-accent transition-colors cursor-pointer"
          >
            <span className="flex items-center">
              <Icons.logout className="h-4 mr-2 w-4" />
              Logout
            </span>
          </span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
