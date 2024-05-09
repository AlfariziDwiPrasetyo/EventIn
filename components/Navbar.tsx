"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import AvatarProfile from "./Avatar";
import { Input } from "./ui/input";

function Navbar() {
  return (
    <header
      className={`z-10 sticky top-0 w-full border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-backgroud/60`}
    >
      <div className="container flex h-14 max-w-screen-2xl items-center md:px-20">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Link
            aria-label="go to homepage"
            href={"/"}
            className={
              "lg:text-xl flex font-pinyon parisienne mr-6 space-x-2 items-center font-bold"
            }
          >
            <p className="text-lg text-primary">EventIn</p>
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* <Input placeholder="Search Events ..." /> */}
          <AvatarProfile />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
