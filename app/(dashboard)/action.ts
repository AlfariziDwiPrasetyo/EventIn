"use server";
import { createClient } from "@/utils/supabase/adminClient";

async function getAllUser() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.admin.listUsers();

  if (error) {
    console.log("Cant get all user");
    return;
  }
  return data;
}
