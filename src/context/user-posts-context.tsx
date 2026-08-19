import { createContext, useContext, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Post } from "../types/post";

export interface NewPostInput {
    title: string;
    body: string;
}

interface UserPostsContextValue {
    userPosts: Post[];
    addUserPost: (input: NewPostInput) => void;
}

const UserPostsContext = createContext<UserPostsContextValue | null>(null);

export function UserPostsProvider({ children }: { children: ReactNode }) {
    const [userPosts, setUserPosts] = useState<Post[]>([]);
    const nextId = useRef(-1);

    const addUserPost = ({ title, body }: NewPostInput) => {
        const post: Post = {
            id: nextId.current--,
            title,
            body,
            tags: [],
            reactions: { likes: 0, dislikes: 0 },
            views: 0,
            userId: 0,
        };
        setUserPosts((posts) => [post, ...posts]);
    };

    const value = useMemo(() => ({ userPosts, addUserPost }), [userPosts]);

    return <UserPostsContext.Provider value={value}>{children}</UserPostsContext.Provider>;
}

export function useUserPosts(): UserPostsContextValue {
    const context = useContext(UserPostsContext);

    if (!context) {
        throw new Error("useUserPosts must be used within a UserPostsProvider");
    }

    return context;
}
