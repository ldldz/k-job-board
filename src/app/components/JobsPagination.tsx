"use client";

import { Pagination } from "@/components/pagination";
import { clamp } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function JobsPagination({
  page,
  totalPageCount,
}: {
  page: number;
  totalPageCount: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <div className="my-4">
      <Pagination
        page={page}
        totalPagesCount={totalPageCount}
        paginationLength={5}
        setPage={(nextPage) => {
          router.push(
            "?" +
              createQueryString(
                "page",
                clamp(nextPage, 1, totalPageCount).toString(),
              ),
          );
        }}
      />
    </div>
  );
}
