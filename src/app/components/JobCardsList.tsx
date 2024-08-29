import JobCard from "@/app/components/JobCard";
import { getBookmarks } from "@/actions/bookmarks";
import { getJobPosts } from "@/actions/jobPosts";
import { Tables } from "@/lib/supabase/types";

export default async function JobCardsList({
  query,
  page,
}: {
  query: string | string[];
  page: number;
}) {
  const jobPosts: Tables<"job_post_details">[] | null = await getJobPosts(query, page);
  const bookmarks: Tables<"bookmarks">[] = await getBookmarks();
  const bookmarkedJobPostIDs = bookmarks.map(({ job_post_id }) => job_post_id);

  return (
    <div className="flex w-full flex-col items-center pt-4">
      <ul className="flex w-[95%] flex-col gap-2 lg:w-[75%] xl:w-[60%]">
        {jobPosts &&
          jobPosts.map((jobPost) => (
            <li key={jobPost.id}>
              <JobCard
                {...jobPost}
                isBookmarked={bookmarkedJobPostIDs.includes(jobPost.id as string)}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}
