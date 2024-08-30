"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const supabase = createClient();

export async function signIn(formData: FormData) {
  const { data } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: `${process.env.BASE_URL}/auth/callback`,
    },
  });

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
}

export async function signOut() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    }
  } else {
    console.warn("No session found, user might already be logged out.");
  }

  redirect(`${process.env.BASE_URL}`);
}
