import JobCard from "@/components/home/JobCard";
import { fetchJobs } from "@/lib/data";
import { Job } from "@/lib/definitions";

export default async function JobCardsList({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const jobs: Job[] | undefined = await fetchJobs(query, currentPage);

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
