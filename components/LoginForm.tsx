"use client";
import React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@/utils/supabase/client";

function AuthForm() {
  const supabase = createClient();
  return (
    <Auth
      supabaseClient={supabase}
      view="magic_link"
      showLinks={false}
      providers={["google"]}
      redirectTo="http://localhost:3000/auth/callback"
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: "#1e1e1e",
              brandAccent: "#2e2e2e",
            },
          },
        },
      }}
    />
  );
}

export default AuthForm;
