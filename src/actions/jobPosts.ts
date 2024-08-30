"use server";

import { createClient } from "@/lib/supabase/server";
import { Tables } from "@/lib/supabase/types";
import { formatSearchString } from "@/lib/utils";

export async function getJobPosts(
  searchValue?: string | string[],
  currentPage: number = 1,
): Promise<Tables<"job_post_details">[] | null> {
  const supabase = createClient();
  let query = supabase
    .from("job_post_details")
    .select("*")
    .eq("is_expired", "false")
    .range(10 * (currentPage - 1), 10 * currentPage + 10 - 1);

  if (searchValue) {
    query = query.textSearch("title", formatSearchString(searchValue));
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching job posts:", error);
    throw error;
  }

  return data;
}

export async function getJobPostsCount(searchValue?: string | string[]): Promise<number | null> {
  const supabase = createClient();
  let query = supabase
    .from("job_posts")
    .select("*", { count: "exact", head: true })
    .eq("is_expired", "false");

  if (searchValue) {
    query = query.textSearch("title", formatSearchString(searchValue));
  }

  const { count, error } = await query;

  if (error) {
    console.error("Error fetching job posts count:", error);
    throw error;
  }
  return count;
}

export async function getBookmarkedJobPosts(): Promise<Tables<"job_post_details">[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("bookmarks").select("job_post_details(*)");
  if (error) {
    console.error("Error fetching bookmarked job posts:", error);
    throw error;
  }

  return data.map(({ job_post_details }) => job_post_details as Tables<"job_post_details">);
}
