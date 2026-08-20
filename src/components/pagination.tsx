import { Link, useSearchParams } from "react-router";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

function pageWindow(current: number, total: number): (number | "gap")[] {
    const wanted = [1, total, current - 1, current, current + 1];
    const pages = [...new Set(wanted)]
        .filter((page) => page >= 1 && page <= total)
        .sort((a, b) => a - b);

    const entries: (number | "gap")[] = [];
    let previous = 0;

    for (const page of pages) {
        if (previous !== 0 && page - previous > 1) {
            entries.push("gap");
        }
        entries.push(page);
        previous = page;
    }

    return entries;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
    const [searchParams] = useSearchParams();

    function hrefForPage(page: number): string {
        const params = new URLSearchParams(searchParams);

        if (page <= 1) {
            params.delete("page");
        } else {
            params.set("page", String(page));
        }

        const queryString = params.toString();
        return queryString === "" ? "/" : `/?${queryString}`;
    }

    if (totalPages <= 1) {
        return null;
    }

    const hasPrevious = currentPage > 1;
    const hasNext = currentPage < totalPages;

    return (
        <nav className="pagination" aria-label="Feed pages">
            {hasPrevious ? (
                <Link className="page-link" to={hrefForPage(currentPage - 1)} rel="prev">
                    ← Previous
                </Link>
            ) : (
                <span className="page-link is-disabled" aria-disabled="true">
                    ← Previous
                </span>
            )}

            <ul className="page-numbers">
                {pageWindow(currentPage, totalPages).map((entry, index) =>
                    entry === "gap" ? (
                        <li key={`gap-${index}`} className="page-gap" aria-hidden="true">
                            …
                        </li>
                    ) : (
                        <li key={entry}>
                            <Link
                                className="page-link"
                                to={hrefForPage(entry)}
                                aria-label={`Page ${entry}`}
                                aria-current={entry === currentPage ? "page" : undefined}
                            >
                                {entry}
                            </Link>
                        </li>
                    ),
                )}
            </ul>

            {hasNext ? (
                <Link className="page-link" to={hrefForPage(currentPage + 1)} rel="next">
                    Next →
                </Link>
            ) : (
                <span className="page-link is-disabled" aria-disabled="true">
                    Next →
                </span>
            )}
        </nav>
    );
}
