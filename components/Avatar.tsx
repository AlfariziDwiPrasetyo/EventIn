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
import { getUserRole } from "@/app/action";
import { signOutUser } from "@/app/logout/actions";

interface UserRole {
  role: string | undefined;
}

function AvatarProfile() {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const [avatarData, setAvatarData] = useState({
    name: "",
    image: "",
  });
  const [userRole, setUserRole] = useState<UserRole[]>();

  useEffect(() => {
    const getLoginUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log("You need to login first");
        setIsLogin(false);
        return;
      }
      const role = await getUserRole();
      setIsLogin(true);
      setUserRole(role);
      setAvatarData({
        name: data.user.user_metadata.name,
        image: data.user.user_metadata.picture,
      });
    };
    getLoginUser();
  }, []);

  const handleLogout = async () => {
    await signOutUser();
    setIsLogin(false);
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
        <DropdownMenuItem>Tickets</DropdownMenuItem>
        {userRole?.[0].role == "admin" ? (
          <Link href="/dashboard">
            <DropdownMenuItem>Dashboard</DropdownMenuItem>
          </Link>
        ) : null}
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
