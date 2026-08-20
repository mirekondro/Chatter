import { Link, NavLink, Outlet, useNavigation } from "react-router";

export function RootLayout() {
    const isNavigating = useNavigation().state !== "idle";

    return (
        <>
            <div
                className={isNavigating ? "route-progress is-active" : "route-progress"}
                aria-hidden="true"
            />

            <a className="skip-link" href="#main">
                Skip to content
            </a>

            <header className="site-header">
                <Link to="/" className="brand">
                    Chatter
                </Link>

                <nav className="site-nav" aria-label="Main">
                    <NavLink to="/" end>
                        Feed
                    </NavLink>
                    <NavLink to="/my-page">My Page</NavLink>
                </nav>
            </header>

            <p className="sr-only" role="status">
                {isNavigating ? "Loading" : ""}
            </p>

            <main id="main" tabIndex={-1} aria-busy={isNavigating}>
                <Outlet />
            </main>
        </>
    );
}
