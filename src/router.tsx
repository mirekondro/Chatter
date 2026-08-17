import { createBrowserRouter } from "react-router";
import { RootLayout } from "./routes/root";
import { RouteError } from "./routes/route-error";
import { Feed, feedLoader } from "./routes/feed";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <RouteError />,
        children: [{ index: true, element: <Feed />, loader: feedLoader }],    },
]);