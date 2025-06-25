import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationPageProps } from "@/types/client/index.types";

const PaginationPage = ({ page, setPage, totalPages }: PaginationPageProps) => {
  const siblingCount = 1; // কতগুলো পেজ নাম্বার দেখাবে current page এর বাম/ডানে
  const totalPageNumbers = siblingCount * 2 + 5; // প্রথম, শেষ, current + siblings + ২টা ellipsis
  const isDisabled = page === 1;

  // Utility function: page number generate করবে (start থেকে end পর্যন্ত)
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  // checking totalpage less then or not from  totalPageNumbers
  if (totalPages <= totalPageNumbers) {
    // যদি total page কম হয়, সব দেখাও
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={(e) => {
                e.preventDefault();
                if (page > 1) setPage(page - 1);
              }}
              aria-disabled={isDisabled}
              className={`px-3 py-1 rounded-md cursor-pointer ${
                isDisabled &&
                "text-muted pointer-events-none cursor-not-allowed opacity-50"
              }`}
            />
          </PaginationItem>

          {range(1, totalPages).map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={p === page}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(p);
                }}
                className="cursor-pointer"
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={(e) => {
                e.preventDefault();
                if (page < totalPages) setPage(page + 1);
              }}
              aria-disabled={isDisabled}
              className={`px-3 py-1 rounded-md cursor-pointer ${
                page === totalPages &&
                "text-muted pointer-events-none cursor-not-allowed opacity-50"
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }

  // Else, smart pagination with ellipsis
  const leftSiblingIndex = Math.max(page - siblingCount, 1);
  const rightSiblingIndex = Math.min(page + siblingCount, totalPages);

  const shouldShowLeftEllipsis = leftSiblingIndex > 2;
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  const pages = [];

  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    // left ellipsis নেই, right ellipsis আছে
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = range(1, leftItemCount);

    pages.push(...leftRange);
    pages.push("right-ellipsis");
    pages.push(totalPages);
  } else if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    // left ellipsis আছে, right ellipsis নেই
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = range(totalPages - rightItemCount + 1, totalPages);

    pages.push(firstPageIndex);
    pages.push("left-ellipsis");
    pages.push(...rightRange);
  } else if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    // দুই পাশেই ellipsis আছে
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);

    pages.push(firstPageIndex);
    pages.push("left-ellipsis");
    pages.push(...middleRange);
    pages.push("right-ellipsis");
    pages.push(lastPageIndex);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) setPage(page - 1);
            }}
            aria-disabled={isDisabled}
            className={`px-3 py-1 rounded-md cursor-pointer ${
              isDisabled &&
              "text-muted pointer-events-none cursor-not-allowed opacity-50"
            }`}
          />
        </PaginationItem>

        {pages.map((p, idx) => {
          if (typeof p === "string") {
            return (
                <PaginationItem key={p + idx}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
          }

          return (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={p === page}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(p); // error area
                }}
                className="cursor-pointer"
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault();
              if (page < totalPages) setPage(page + 1);
            }}
            aria-disabled={isDisabled}
            className={`px-3 py-1 rounded-md cursor-pointer ${
              page === totalPages &&
              "text-muted pointer-events-none cursor-not-allowed opacity-50"
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationPage;
