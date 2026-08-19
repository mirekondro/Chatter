import type { LoaderFunctionArgs } from "react-router";
import { Link, useLoaderData } from "react-router";
import { fetchPost } from "../api/posts";
import { fetchComments } from "../api/comments";
import type { Post } from "../types/post";
import type { CommentsResponse } from "../types/comment";

interface PostPageData {
    post: Post;
    comments: CommentsResponse;
}

export async function postLoader({
    params,
    request,
}: LoaderFunctionArgs): Promise<PostPageData> {
    const postId = Number(params.postId);

    const [post, comments] = await Promise.all([
        fetchPost(postId, request.signal),
        fetchComments(postId, request.signal),
    ]);

    return { post, comments };
}

export function PostPage() {
    const { post, comments } = useLoaderData<PostPageData>();

    return (
        <article className="post">
            <Link to="/" className="back-link">
                ← Back to feed
            </Link>

            <h1>{post.title}</h1>
            <p className="post__body">{post.body}</p>

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

            <section className="comments">
                <h2>Comments ({comments.total})</h2>

                {comments.comments.length === 0 ? (
                    <p className="hint">No comments yet.</p>
                ) : (
                    <ul className="comment-list">
                        {comments.comments.map((comment) => (
                            <li key={comment.id} className="comment">
                                <p className="comment__body">{comment.body}</p>
                                <footer className="comment__meta">
                                    <span>{comment.user.fullName}</span>
                                    <span>▲ {comment.likes}</span>
                                </footer>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </article>
    );
}
