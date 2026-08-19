import { RouterProvider } from "react-router";
import { router } from "./router";
import { UserPostsProvider } from "./context/user-posts-context";
import "./vendor/classless.css";
import "./index.css";

export function App() {
    return (
        <UserPostsProvider>
            <RouterProvider router={router} />
        </UserPostsProvider>
    );
}

export default App;