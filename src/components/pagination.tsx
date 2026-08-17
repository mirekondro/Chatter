import { Link, useNavigation } from "react-router";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

function hrefForPage(page: number): string {
    return page <= 1 ? "/" : `/?page=${page}`;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
    const isBusy = useNavigation().state === "loading";
    const hasPrevious = currentPage > 1;
    const hasNext = currentPage < totalPages;

    return (
        <nav className="pagination" aria-label="Feed pages">
            {hasPrevious ? (
                <Link className="button" to={hrefForPage(currentPage - 1)} rel="prev">
                    ← Previous
                </Link>
            ) : (
                <span className="button button--disabled" aria-disabled="true">
          ← Previous
        </span>
            )}

            <span className="pagination__status" aria-live="polite">
        {isBusy ? "Loading…" : `Page ${currentPage} of ${totalPages}`}
      </span>

            {hasNext ? (
                <Link className="button" to={hrefForPage(currentPage + 1)} rel="next">
                    Next →
                </Link>
            ) : (
                <span className="button button--disabled" aria-disabled="true">
          Next →
        </span>
            )}
        </nav>
    );
}