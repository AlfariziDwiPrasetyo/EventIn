"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const supabase = createClient();

export async function getUserId() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user) {
    console.log("Cant get userId", error?.message);
    return;
  }

  return user.id;
}

export async function getUserRole() {
  const userId = await getUserId();

  const { data: role, error } = await supabase
    .from("roles")
    .select("role")
    .eq("id_user", userId);

  if (error) {
    console.log("error cant get user role", error.message);
    return;
  }
  return role;
}

export async function assignDefaultRole() {
  const userId = await getUserId();

  const { data: roles, error: rolesError } = await supabase
    .from("roles")
    .select("role")
    .eq("id_user", userId);

  if (rolesError) {
    console.error("Error checking user role:", rolesError.message);
    return;
  }

  if (roles.length > 0) {
    // console.log("User already has a role:", roles);
    return;
  }

  const { error } = await supabase
    .from("roles")
    .insert([
      {
        role: "customer",
        id_user: userId,
      },
    ])
    .eq("id_user", userId);

  if (error) {
    console.log("Error cant assign the role ", error.message);
  }

  return console.log({ userid: userId });
}
