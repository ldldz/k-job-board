import JobCardsList from "@/components/home/JobCardsList";
import Main from "@/components/home/Main";
import SearchBar from "@/components/home/SearchBar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const PAGINATION_LENGTH = 5;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page || 1); // page가 없으면 1
  const paginationNumbers = Array.from(
    { length: PAGINATION_LENGTH },
    (_, i) =>
      Math.floor((currentPage - 1) / PAGINATION_LENGTH) * PAGINATION_LENGTH +
      i +
      1,
  );
  const prevPage =
    paginationNumbers[0] - PAGINATION_LENGTH > 0
      ? paginationNumbers[0] - PAGINATION_LENGTH
      : 1;
  const nextPage = currentPage + PAGINATION_LENGTH;

  return (
    <div className="flex flex-col items-center">
      <Main />
      <div className="flex w-full justify-center py-4">
        <SearchBar />
      </div>
      <Separator />
      <JobCardsList query={query} currentPage={currentPage} />
      <div className="my-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={{ query: { ...searchParams, page: prevPage } }}
              />
            </PaginationItem>
            {paginationNumbers.map((paginationNumber) => (
              <PaginationItem key={paginationNumber}>
                <PaginationLink
                  href={{ query: { ...searchParams, page: paginationNumber } }}
                  isActive={currentPage === paginationNumber}
                >
                  {paginationNumber}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href={{ query: { ...searchParams, page: nextPage } }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
