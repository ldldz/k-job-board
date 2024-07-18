import { JobBoard, Main, SearchBar } from "@/app/components";
import { Button } from "@/components/button";
import { Separator } from "@/components/separator";
import { Suspense } from "react";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <Suspense>
      <div className="flex flex-col items-center">
        <div className="w-full">
          <nav className="max-w-8xl mx-auto flex justify-end px-8 py-4">
            {!data.user ? (
              <Button asChild>
                <Link href={"/login"}>로그인</Link>
              </Button>
            ) : (
              <div>
                <Link href={"/login"}>{data.user.user_metadata.name}</Link>
              </div>
            )}
          </nav>
        </div>
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
