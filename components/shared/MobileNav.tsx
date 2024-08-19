import React from "react";
import {
  Sheet,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetDescription,
  SheetClose,
} from "../ui/sheet";
import { AlignRight } from "lucide-react";
import Link from "next/link";
import { Separator } from "@radix-ui/react-separator";
import NavItems from "./NavItems";

const MobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <AlignRight />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
          <Link href={"/"} className="w-36 p-medium-20">
            Eventin
          </Link>
          <Separator className="border border-gray-100" />
          <SheetClose asChild>
            <NavItems />
          </SheetClose>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
