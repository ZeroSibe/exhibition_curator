import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

export default function PageControl({ page, setSearchParams, pageTotal }) {
  const NumberPg = Number(page);
  const handleNextPage = () => {
    if (Number(page) < pageTotal) {
      setSearchParams((currPage) => {
        currPage.set("page", Number(page) + 1);
        return currPage;
      });
    }
  };

  const handlePreviousPage = () => {
    if (Number(page) > 1) {
      setSearchParams((currPage) => {
        currPage.set("page", Number(page) - 1);
        return currPage;
      });
    }
  };

  const handlePageChange = (newPage) => {
    setSearchParams((currValues) => {
      currValues.set("page", newPage);
      return currValues;
    });
  };

  const renderPageNumbers = () => {
    const pageLinks = [];
    const maxPagesToShow = 3;
    const isNearStart = Number(page) <= maxPagesToShow;
    const isNearEnd = Number(page) >= pageTotal - maxPagesToShow;
    let startPage = Math.max(2, Number(page) - 1);
    let endPage = Math.min(pageTotal - 1, Number(page) + 1);

    pageLinks.push(
      <PaginationItem key={1}>
        <PaginationLink
          isActive={page === 1}
          onClick={() => handlePageChange(1)}
          aria-label={page === 1 ? "on page 1" : "go to page 1"}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    if (!isNearStart) {
      pageLinks.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pageLinks.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={page === i}
            onClick={() => handlePageChange(i)}
            aria-label={page === i ? `on page ${i}` : `go to page ${i}`}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (!isNearEnd) {
      pageLinks.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    if (pageTotal > 1) {
      pageLinks.push(
        <PaginationItem key={pageTotal}>
          <PaginationLink
            isActive={page === pageTotal}
            onClick={() => handlePageChange(pageTotal)}
            aria-label={
              page === pageTotal
                ? `on the last page, page ${pageTotal}`
                : `go to the last page, page ${pageTotal}`
            }
          >
            {pageTotal}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pageLinks;
  };

  return (
    <div>
      <Pagination>
        <PaginationContent>
          {page !== 1 && (
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePreviousPage}
                aria-label="go previous page"
              />
            </PaginationItem>
          )}
          {renderPageNumbers()}
          {page !== pageTotal && (
            <PaginationItem>
              <PaginationNext
                onClick={handleNextPage}
                aria-label="go next page"
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
