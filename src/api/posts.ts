import type { Post, PostsResponse } from "../types/post";

const API_BASE = "https://dummyjson.com";

export const POSTS_PER_PAGE = 12;

export class ApiError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

export interface FetchPostsOptions {
    page?: number;
    query?: string;
    signal?: AbortSignal;
}

export async function fetchPosts({
    page = 1,
    query = "",
    signal,
}: FetchPostsOptions = {}): Promise<PostsResponse> {
    const trimmed = query.trim();
    const url = new URL(trimmed ? "/posts/search" : "/posts", API_BASE);

    if (trimmed) {
        url.searchParams.set("q", trimmed);
    }
    url.searchParams.set("limit", String(POSTS_PER_PAGE));
    url.searchParams.set("skip", String((page - 1) * POSTS_PER_PAGE));

    const response = await fetch(url, { signal });

    if (!response.ok) {
        throw new ApiError(response.status, `Could not load posts (${response.status})`);
    }

    return (await response.json()) as PostsResponse;
}

export async function fetchPost(id: number, signal?: AbortSignal): Promise<Post> {
    const url = new URL(`/posts/${id}`, API_BASE);

    const response = await fetch(url, { signal });

    if (!response.ok) {
        throw new ApiError(response.status, `Could not load post ${id} (${response.status})`);
    }

    return (await response.json()) as Post;
}

export function pageCount(total: number): number {
    return Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
}

export function parsePage(raw: string | null): number {
    const page = Number(raw);
    return Number.isInteger(page) && page > 0 ? page : 1;
}
