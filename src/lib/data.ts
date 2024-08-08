"use server";

import { createClient } from "@/utils/supabase/server";
import { formatSearchString } from "./utils";
import { Tables } from "@/types/supabase";
import { revalidatePath } from "next/cache";

export async function fetchJobs(
  searchValue?: string | string[],
  currentPage: number = 1,
): Promise<Tables<"job_post_details">[] | null> {
  const supabase = createClient();
  const PER_PAGE = 10;
  const SKIP_NUMBER = PER_PAGE * (currentPage - 1);
  let query = supabase
    .from("job_post_details")
    .select("*")
    .eq("is_expired", "false")
    .range(SKIP_NUMBER, SKIP_NUMBER + PER_PAGE - 1);

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

export async function getJobsCount(searchValue?: string | string[]): Promise<number | null> {
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

export async function getBookmarks(): Promise<Tables<"bookmarks">[]> {
  const supabase = createClient();
  const { data: bookmarks, error } = await supabase.from("bookmarks").select("*");

  if (error) {
    console.error("Error fetching bookmarks:", error);
    throw error;
  }

  return bookmarks;
}

export async function insertBookmark(jobPostID: string) {
  const supabase = createClient();
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
  const supabase = createClient();

  const { error } = await supabase.from("bookmarks").delete().eq("job_post_id", jobPostID);

  if (error) {
    console.error("Error fetching bookmarks:", error);
    throw error;
  }
  revalidatePath("/");
}

export async function getBookmarkedJobPosts() {
  const supabase = createClient();
  const bookmarkedJobPostIDs = (await getBookmarks()).map(({ job_post_id }) => job_post_id);
  const { data, error } = await supabase
    .from("job_post_details")
    .select("*")
    .in("id", bookmarkedJobPostIDs);

  if (error) {
    console.error("Error fetching bookmarked job posts:", error);
    throw error;
  }

  return data;
}
