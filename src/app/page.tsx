import JobCardsList from "@/components/home/JobCardsList";
import JobsPagination from "@/components/home/JobsPagination";
import Main from "@/components/home/Main";
import SearchBar from "@/components/home/SearchBar";

import { Separator } from "@/components/ui/separator";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page || 1); // page가 없으면 1
  const query = searchParams?.query || "";

  return (
    <div className="flex flex-col items-center pt-6">
      <Main />
      <div className="flex w-full justify-center py-4">
        <SearchBar />
      </div>
      <Separator />
      <JobCardsList query={query} currentPage={currentPage} />
      <JobsPagination searchParams={searchParams} currentPage={currentPage} />
    </div>
  );
}
