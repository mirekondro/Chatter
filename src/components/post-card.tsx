import { Link } from "react-router";
import type { Post } from "../types/post";
import { useUserPosts } from "../context/user-posts-context";

const EXCERPT_LENGTH = 180;

function excerpt(body: string): string {
    return body.length <= EXCERPT_LENGTH
        ? body
        : `${body.slice(0, EXCERPT_LENGTH).trimEnd()}…`;
}

export function PostCard({ post }: { post: Post }) {
    // Only locally-created posts (negative ids) can be deleted. dummyjson's
    // DELETE is simulated — it answers 200 but never removes anything — so a
    // delete button on an API post would be a button that lies.
    const isLocal = post.id < 0;
    const { removeUserPost } = useUserPosts();

    return (
        <article className="card">
            <h2>
                {isLocal ? (
                    post.title
                ) : (
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                )}
                {isLocal && <span className="badge">Your post</span>}
            </h2>
            <p>{excerpt(post.body)}</p>

            {post.tags.length > 0 && (
                <ul className="tags">
                    {post.tags.map((tag) => (
                        <li key={tag}>#{tag}</li>
                    ))}
                </ul>
            )}

            <footer className="meta">
                <span>▲ {post.reactions.likes}</span>
                <span>▼ {post.reactions.dislikes}</span>
                <span>{post.views.toLocaleString()} views</span>

                {isLocal && (
                    <button type="button" onClick={() => removeUserPost(post.id)}>
                        Delete
                    </button>
                )}
            </footer>
        </article>
    );
}
