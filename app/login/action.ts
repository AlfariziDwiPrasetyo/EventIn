"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

interface signInData {
  email: string;
}

export async function login(data: signInData) {
  const supabase = createClient();

  const email = data.email;

  const { error } = await supabase.auth.signInWithOtp({
    email,
  });

  console.log(error);
  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function loginWithGoogle() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    redirect("/error");
  }
  revalidatePath("/", "layout");
  redirect("/");
}
