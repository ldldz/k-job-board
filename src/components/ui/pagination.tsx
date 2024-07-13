import { forwardRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

interface PaginationProps extends React.ComponentProps<"nav"> {
  page: number;
  totalPagesCount: number;
  paginationLength: number;
  setPage: <T>(nextPage: number) => void | T;
}

const Pagination = ({
  page,
  totalPagesCount,
  paginationLength,
  className,
  setPage,
  ...props
}: PaginationProps) => {
  const paginationNumbers = Array.from(
    { length: paginationLength },
    (_, i) =>
      Math.floor((page - 1) / paginationLength) * paginationLength + i + 1,
  );

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    >
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => setPage(page - 1)} />
        </PaginationItem>
        {paginationNumbers.map(
          (paginationNumber) =>
            paginationNumber <= totalPagesCount && (
              <PaginationItem key={paginationNumber}>
                <PaginationLink
                  isActive={page === paginationNumber}
                  onClick={() => setPage(paginationNumber)}
                >
                  {paginationNumber}
                </PaginationLink>
              </PaginationItem>
            ),
        )}
        <PaginationItem>
          <PaginationNext onClick={() => setPage(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </nav>
  );
};
Pagination.displayName = "Pagination";

const PaginationContent = forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("", className)} {...props} />
  ),
);
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"button">;

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <button
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
