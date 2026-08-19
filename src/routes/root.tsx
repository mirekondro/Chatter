import { Link, Outlet, useNavigation } from "react-router";

export function RootLayout() {
    const isNavigating = useNavigation().state === "loading";

    return (
        <>
            <header className="site-header">
                <Link to="/" className="brand">
                    Chatter
                </Link>
                <nav className="site-nav">
                    <Link to="/">Feed</Link>
                    <Link to="/my-page">My Page</Link>
                </nav>
                <span className="status" aria-live="polite">
          {isNavigating ? "Loading…" : ""}
        </span>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    );
}