import React, { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { createClient } from "@/utils/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";

function AvatarProfile() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  useEffect(() => {
    const getLoginUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log("You need to login first");
        return;
      }
      setIsLogin(true);
    };
    getLoginUser();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      setIsLogin(false);
    }
  };

  return isLogin ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-6 h-6 md:w-8 md:h-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="py-4">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <form action={handleLogout}>
          <Button className="w-full mt-3">Logout</Button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button>
      <Link href="/login">Login</Link>
    </Button>
  );
}

export default AvatarProfile;
