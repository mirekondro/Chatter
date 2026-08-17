import { ApiError } from "./posts";
import type { CommentsResponse } from "../types/comment";

const API_BASE = "https://dummyjson.com";

export async function fetchComments(
    postId: number,
    signal?: AbortSignal,
): Promise<CommentsResponse> {
    const url = new URL(`/posts/${postId}/comments`, API_BASE);
    url.searchParams.set("limit", "0"); // 0 = no limit, return every comment

    const response = await fetch(url, { signal });

    if (!response.ok) {
        throw new ApiError(
            response.status,
            `Could not load comments for post ${postId} (${response.status})`,
        );
    }

    return (await response.json()) as CommentsResponse;
}
