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
  const jobsCount: number = (await getJobsCount(query)) || 0;

  return (
    <>
      <div className="mt-4 w-[95%] text-sm text-gray-600 lg:w-[75%] xl:w-[60%]">
        {jobsCount}개의 채용공고가 있어요.
      </div>
      <JobCardsList query={query} page={page} />
      <JobsPagination page={page} totalPageCount={Math.ceil(jobsCount / 10)} />
    </>
  );
};

export default JobBoard;
