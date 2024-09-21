import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import MobileNav from "./MobileNav";
import NavItems from "./NavItems";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link
          href={"/"}
          className="w-36 font-bold text-primary text-lg md:text-1xl"
        >
          Eventin
        </Link>

        <SignedIn>
          <nav className="md:flex-between max-w-xs w-full hidden">
            <NavItems />
          </nav>
        </SignedIn>

        <div className="justify-end w-32 flex">
          <SignedIn>
            <div className="flex space-x-3">
              <UserButton afterSwitchSessionUrl="/" />
              <MobileNav />
            </div>
          </SignedIn>
          <SignedOut>
            <Button asChild>
              <Link href={"/sign-in"}>Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
