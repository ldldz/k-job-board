import JobCard from "@/app/components/JobCard";
import { fetchJobs } from "@/lib/data";
import { Job } from "@/lib/definitions";
import { Tables } from "@/types/supabase";

export default async function JobCardsList({
  query,
  page,
}: {
  query: string | string[];
  page: number;
}) {
  const jobs: Tables<"job_post_details">[] | null = await fetchJobs(query, page);

  return (
    <div className="flex w-full flex-col items-center pt-4">
      <ul className="flex w-[95%] flex-col gap-2 lg:w-[75%] xl:w-[60%]">
        {jobs &&
          jobs.map((job, i) => (
            <li key={i}>
              <JobCard {...job} />
            </li>
          ))}
      </ul>
    </div>
  );
}
