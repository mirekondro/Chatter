import { useState } from "react";
import type { FormEvent } from "react";
import { useUserPosts } from "../context/user-posts-context";
import { PostCard } from "../components/post-card";

export function MyPage() {
    const { userPosts, addUserPost } = useUserPosts();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const trimmedTitle = title.trim();
        const trimmedBody = body.trim();

        if (trimmedTitle === "" || trimmedBody === "") {
            return;
        }

        addUserPost({ title: trimmedTitle, body: trimmedBody });
        setTitle("");
        setBody("");
    }

    return (
        <section className="my-page">
            <h1>My Page</h1>

            <form className="post-form" onSubmit={handleSubmit}>
                <label htmlFor="post-title">Title</label>
                <input
                    id="post-title"
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Give your post a title"
                    required
                />

                <label htmlFor="post-body">Post</label>
                <textarea
                    id="post-body"
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                    placeholder="What's on your mind?"
                    rows={5}
                    required
                />

                <button type="submit">Publish</button>
            </form>

            <h2>Your posts</h2>

            {userPosts.length === 0 ? (
                <p className="hint">You haven't posted anything yet — write your first post above.</p>
            ) : (
                <ul className="feed-list">
                    {userPosts.map((post) => (
                        <li key={post.id}>
                            <PostCard post={post} />
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
