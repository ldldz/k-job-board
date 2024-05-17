import JobCardsList from "@/components/home/JobCardsList";
import Main from "@/components/home/Main";
import SearchBar from "@/components/home/SearchBar";
import { Separator } from "@/components/ui/separator";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";

  return (
    <div className="flex flex-col items-center">
      <Main />
      <div className="flex w-full justify-center py-4">
        <SearchBar />
      </div>
      <Separator />
      <JobCardsList query={query} />
    </div>
  );
}
