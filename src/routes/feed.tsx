import type { LoaderFunctionArgs } from "react-router";
import { Link, useLoaderData } from "react-router";
import { fetchPosts, pageCount, parsePage } from "../api/posts";
import type { PostsResponse } from "../types/post";
import { PostCard } from "../components/post-card";
import { Pagination } from "../components/pagination";
import { SearchForm } from "../components/search-form";
import { useUserPosts } from "../context/user-posts-context";

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
    const { userPosts } = useUserPosts();

    const currentPage = Math.floor(skip / limit) + 1;
    const totalPages = pageCount(total);

    // Locally-created posts aren't paginated on a real backend, so they're
    // only pinned to the top of page 1 — and filtered by the search query
    // like everything else, so search still feels consistent.
    const matchingUserPosts =
        currentPage === 1
            ? userPosts.filter((post) => {
                  if (query === "") return true;
                  const needle = query.toLowerCase();
                  return (
                      post.title.toLowerCase().includes(needle) ||
                      post.body.toLowerCase().includes(needle)
                  );
              })
            : [];

    const allPosts = [...matchingUserPosts, ...posts];
    const displayedTotal = total + matchingUserPosts.length;

    return (
        <section className="feed">
            <SearchForm />

            <div className="feed-header">
                <h1>{query === "" ? "Feed" : `Results for “${query}”`}</h1>
                <p>
                    {displayedTotal.toLocaleString()} {displayedTotal === 1 ? "post" : "posts"}
                </p>
            </div>

            {allPosts.length === 0 ? (
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
                    {allPosts.map((post) => (
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
