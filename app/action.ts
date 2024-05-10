"use server";
import { createClient } from "@/utils/supabase/server";

export async function assignDefaultRole() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data: roles, error: rolesError } = await supabase
    .from("roles")
    .select("role")
    .eq("id_user", user.id);

  if (rolesError) {
    console.error("Error checking user role:", rolesError.message);
    return;
  }

  if (roles.length > 0) {
    console.log("User already has a role:", roles);
    return;
  }

  const { error } = await supabase
    .from("roles")
    .insert([
      {
        role: "customer",
        id_user: user.id,
      },
    ])
    .eq("id_user", user.id);

  if (error) {
    console.log("Error cant assign the role ", error.message);
  }

  return console.log({ userid: user.id });
}
