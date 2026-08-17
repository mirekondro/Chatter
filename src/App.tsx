import { RouterProvider } from "react-router";
import { router } from "./router";
import "./vendor/classless.css";
import "./index.css";

export function App() {
    return <RouterProvider router={router} />;
}

export default App;