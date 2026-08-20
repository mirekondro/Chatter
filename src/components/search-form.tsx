import { Form, Link, useNavigation, useSearchParams } from "react-router";

export function SearchForm() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") ?? "";

    const navigation = useNavigation();
    const pendingQuery =
        navigation.location !== undefined
            ? (new URLSearchParams(navigation.location.search).get("q") ?? "")
            : null;
    const isSearching = pendingQuery !== null && pendingQuery !== query;

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
            <button type="submit" disabled={isSearching}>
                {isSearching ? "Searching…" : "Search"}
            </button>
            {query !== "" && <Link to="/">Clear</Link>}
        </Form>
    );
}
