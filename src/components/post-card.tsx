import { Link } from "react-router";
import type { Post } from "../types/post";

const EXCERPT_LENGTH = 180;

function excerpt(body: string): string {
    return body.length <= EXCERPT_LENGTH
        ? body
        : `${body.slice(0, EXCERPT_LENGTH).trimEnd()}…`;
}

export function PostCard({ post }: { post: Post }) {
    return (
        <article className="card">
            <h2>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
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
            </footer>
        </article>
    );
}