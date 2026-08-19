import { createBrowserRouter } from "react-router";
import { RootLayout } from "./routes/root";
import { RouteError } from "./routes/route-error";
import { Feed, feedLoader } from "./routes/feed";
import { PostPage, postLoader } from "./routes/post";
import { MyPage } from "./routes/my-page";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <RouteError />,
        children: [
            { index: true, element: <Feed />, loader: feedLoader },
            { path: "posts/:postId", element: <PostPage />, loader: postLoader },
            { path: "my-page", element: <MyPage /> },
        ],
    },
]);
