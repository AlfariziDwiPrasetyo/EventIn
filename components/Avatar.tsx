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
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const [avatarData, setAvatarData] = useState({
    name: "",
    image: "",
  });
  useEffect(() => {
    const getLoginUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log("You need to login first");
        setIsLogin(false);
        return;
      }
      setIsLogin(true);
      setAvatarData({
        name: data.user.user_metadata.name,
        image: data.user.user_metadata.picture,
      });
      console.log(data);
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

  if (isLogin === null) {
    return null;
  }

  return isLogin ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-6 h-6 md:w-8 md:h-8">
          <AvatarImage src={avatarData.image} />
          <AvatarFallback>{avatarData.name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="py-4">
        <DropdownMenuLabel>{avatarData.name}</DropdownMenuLabel>
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
    <Link href="/login">
      <Button>Login</Button>
    </Link>
  );
}

export default AvatarProfile;
