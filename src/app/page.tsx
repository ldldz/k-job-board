import { JobBoard, Main, SearchBar } from "@/app/components";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}) {
  return (
    <Suspense>
      <div className="flex flex-col items-center">
        <Main />
        <div className="flex w-full justify-center py-4">
          <SearchBar />
        </div>
        <Separator />
        <JobBoard searchParams={searchParams} />
      </div>
    </Suspense>
  );
}
