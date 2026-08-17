import type { LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { fetchPosts, pageCount, parsePage } from "../api/posts";
import type { PostsResponse } from "../types/post";
import { PostCard } from "../components/post-card";
import { Pagination } from "../components/pagination";

export async function feedLoader({
                                     request,
                                 }: LoaderFunctionArgs): Promise<PostsResponse> {
    const page = parsePage(new URL(request.url).searchParams.get("page"));
    return fetchPosts({ page, signal: request.signal });
}

export function Feed() {
    const { posts, total, skip, limit } = useLoaderData<PostsResponse>();

    const currentPage = Math.floor(skip / limit) + 1;
    const totalPages = pageCount(total);

    return (
        <section className="feed">
            <div className="feed-header">
                <h1>Feed</h1>
                <p className="feed__count">{total.toLocaleString()} posts</p>
            </div>

            {posts.length === 0 ? (
                <p className="hint">Nothing here — try going back a page.</p>
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