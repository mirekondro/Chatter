import { Link, isRouteErrorResponse, useRouteError } from "react-router";
import { ApiError } from "../api/posts";

function describe(error: unknown): string {
    if (isRouteErrorResponse(error)) {
        return error.status === 404
            ? "That page doesn't exist."
            : `${error.status} ${error.statusText}`;
    }
    if (error instanceof ApiError) {
        return `${error.message} — dummyjson may be unreachable.`;
    }
    if (error instanceof Error) {
        return error.message;
    }
    return "Something went wrong.";
}

export function RouteError() {
    const error = useRouteError();

    return (
        <div className="warn" role="alert">
            <h1>Sorry — that didn't work</h1>
            <p>{describe(error)}</p>
            <Link to="/">Back to the feed</Link>
        </div>
    );
}