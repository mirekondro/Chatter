import { Form, Link, useNavigation, useSearchParams } from "react-router";

export function SearchForm() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") ?? "";
    const isBusy = useNavigation().state === "loading";

    return (
        <Form role="search" action="/" className="search">
            <input
                key={query}
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Search posts…"
                aria-label="Search posts"
            />
            <button type="submit" disabled={isBusy}>
                {isBusy ? "Searching…" : "Search"}
            </button>
            {query !== "" && <Link to="/">Clear</Link>}
        </Form>
    );
}