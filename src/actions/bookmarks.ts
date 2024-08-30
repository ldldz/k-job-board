"use server";

import { createClient } from "@/lib/supabase/server";
import { Tables } from "@/lib/supabase/types";
import { revalidatePath } from "next/cache";

const supabase = createClient();

export async function getBookmarks(): Promise<Tables<"bookmarks">[]> {
  const { data: bookmarks, error } = await supabase.from("bookmarks").select("*");

  if (error) {
    console.error("Error fetching bookmarks:", error);
    throw error;
  }

  return bookmarks;
}

export async function insertBookmark(jobPostID: string) {
  const { data, error } = await supabase
    .from("bookmarks")
    .insert([{ job_post_id: jobPostID }])
    .select();

  if (error) {
    console.error("Error fetching bookmarks:", error);
    throw error;
  }

  revalidatePath("/");

  return data;
}

export async function deleteBookmark(jobPostID: string) {
  const { error } = await supabase.from("bookmarks").delete().eq("job_post_id", jobPostID);

  if (error) {
    console.error("Error fetching bookmarks:", error);
    throw error;
  }
  revalidatePath("/");
}
