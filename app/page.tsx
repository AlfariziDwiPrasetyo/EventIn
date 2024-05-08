import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { signOutUser } from "./logout/actions";
import { Button } from "@/components/ui/button";

export default async function Home() {
  "use server";
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <main className="">
      <p>{data.user.email}</p>
      <form action="">
        <Button formAction={signOutUser}>logout</Button>
      </form>
    </main>
  );
}
