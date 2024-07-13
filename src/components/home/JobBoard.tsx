import { getJobsCount } from "@/lib/data";
import JobCardsList from "./JobCardsList";
import JobsPagination from "./JobsPagination";

const JobBoard = async ({
  searchParams,
}: {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const page = Number(searchParams?.page || 1); // page가 없으면 1
  const query = searchParams?.query || "";
  const jobsCount: number = await getJobsCount(query);

  return (
    <>
      <JobCardsList query={query} page={page} />
      <JobsPagination page={page} totalPageCount={Math.ceil(jobsCount / 10)} />
    </>
  );
};

export default JobBoard;
