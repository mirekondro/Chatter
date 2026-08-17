import type { LoaderFunctionArgs } from "react-router";
import { Link, useLoaderData } from "react-router";
import { fetchPosts, pageCount, parsePage } from "../api/posts";
import type { PostsResponse } from "../types/post";
import { PostCard } from "../components/post-card";
import { Pagination } from "../components/pagination";
import { SearchForm } from "../components/search-form";

interface FeedData extends PostsResponse {
    query: string;
}

export async function feedLoader({
                                     request,
                                 }: LoaderFunctionArgs): Promise<FeedData> {
    const params = new URL(request.url).searchParams;
    const page = parsePage(params.get("page"));
    const query = params.get("q")?.trim() ?? "";

    const data = await fetchPosts({ page, query, signal: request.signal });

    return { ...data, query };
}

export function Feed() {
    const { posts, total, skip, limit, query } = useLoaderData<FeedData>();

    const currentPage = Math.floor(skip / limit) + 1;
    const totalPages = pageCount(total);

    return (
        <section className="feed">
            <SearchForm />

            <div className="feed-header">
                <h1>{query === "" ? "Feed" : `Results for “${query}”`}</h1>
                <p>
                    {total.toLocaleString()} {total === 1 ? "post" : "posts"}
                </p>
            </div>

            {posts.length === 0 ? (
                <p className="hint">
                    {query === "" ? (
                        "Nothing here — try going back a page."
                    ) : (
                        <>
                            No posts match “{query}”. <Link to="/">Back to the feed</Link>
                        </>
                    )}
                </p>
            ) : (
                <ul className="feed-list">
                    {posts.map((post) => (
                        <li key={post.id}>
                            <PostCard post={post} />
                        </li>
                    ))}
                </ul>
            )}

            <Pagination currentPage={currentPage} totalPages={totalPages} />
        </section>
    );
}