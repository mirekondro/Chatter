import { Link, useLocation } from "react-router";
import type { Post } from "../types/post";
import { useUserPosts } from "../context/user-posts-context";

const EXCERPT_LENGTH = 180;

function excerpt(body: string): string {
    return body.length <= EXCERPT_LENGTH
        ? body
        : `${body.slice(0, EXCERPT_LENGTH).trimEnd()}…`;
}

export function PostCard({ post }: { post: Post }) {
    const isLocal = post.id < 0;
    const { removeUserPost } = useUserPosts();
    const location = useLocation();

    return (
        <article className="card">
            <h2 className="card__title">
                {isLocal ? (
                    post.title
                ) : (
                    <Link
                        className="card__link"
                        to={`/posts/${post.id}`}
                        state={{ from: location.search }}
                    >
                        {post.title}
                    </Link>
                )}
                {isLocal && <span className="badge">Your post</span>}
            </h2>

            <p className="card__excerpt">{excerpt(post.body)}</p>

            {post.tags.length > 0 && (
                <ul className="tags">
                    {post.tags.map((tag) => (
                        <li key={tag}>
                            <Link to={`/?q=${encodeURIComponent(tag)}`}>#{tag}</Link>
                        </li>
                    ))}
                </ul>
            )}

            <footer className="meta">
                <span title="Likes">▲ {post.reactions.likes}</span>
                <span title="Dislikes">▼ {post.reactions.dislikes}</span>
                <span title="Views">{post.views.toLocaleString()} views</span>

                {isLocal && (
                    <button type="button" onClick={() => removeUserPost(post.id)}>
                        Delete
                    </button>
                )}
            </footer>
        </article>
    );
}
