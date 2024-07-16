import { createClient } from "@/utils/supabase/server";
import { formatSearchString } from "./utils";
import { Tables } from "@/types/supabase";

export async function fetchJobs(
  searchValue?: string | string[],
  currentPage: number = 1,
): Promise<Tables<"job_posts">[] | null> {
  const supabase = createClient();
  const PER_PAGE = 10;
  const SKIP_NUMBER = PER_PAGE * (currentPage - 1);
  let query = supabase
    .from("job_posts")
    .select("*")
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

export async function getJobsCount(
  searchValue?: string | string[],
): Promise<number | null> {
  const supabase = createClient();
  let query = supabase
    .from("job_posts")
    .select("*", { count: "exact", head: true });

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
