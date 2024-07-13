import { JobBoard, Main, SearchBar } from "@/components/home";
import { Separator } from "@/components/ui/separator";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}) {
  return (
    <div className="flex flex-col items-center pt-6">
      <Main />
      <div className="flex w-full justify-center py-4">
        <SearchBar />
      </div>
      <Separator />
      <JobBoard searchParams={searchParams} />
    </div>
  );
}
