"use server";
import { createClient } from "@/utils/supabase/adminClient";
import { getUserRoleById } from "../action";
import { Users } from "./dashboard/user/columns";
import { revalidatePath } from "next/cache";

export async function getAllUser() {
  const supabase = createClient();
  const { data: usersData, error } = await supabase.auth.admin.listUsers();

  if (error) {
    console.log("Cant get all user");
    return [];
  }

  const promises = usersData.users.map(async (user) => {
    const role = await getUserRoleById(user.id);
    return {
      id: user.id ?? "",
      email: user.email ?? "",
      full_name: user.user_metadata.full_name ?? "",
      role: role?.[0].role,
    };
  });

  return Promise.all(promises);
}
