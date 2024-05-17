import JobCard from "@/components/home/JobCard";
import fetchJobs from "@/lib/data";
import { Job } from "@/lib/definitions";

export default async function JobCardsList({ query }: { query: string }) {
  const jobs: Job[] | undefined = await fetchJobs(query);

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
