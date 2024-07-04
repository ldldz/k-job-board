import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function JobsPagination({
  searchParams,
  currentPage,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
  currentPage: number;
}) {
  const PAGINATION_LENGTH = 5;

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
  );
}
