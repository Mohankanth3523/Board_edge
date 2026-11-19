import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { useEffect } from "react";
import { domAnimation, LazyMotion, MotionConfig } from "motion/react";
import type { Route } from "./+types/root";
import "./styles/app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preload", href: "/fonts/Inter-Regular.woff", as: "font", type: "font/woff", crossOrigin: "anonymous" },
  { rel: "preload", href: "/fonts/InterDisplay-Bold.woff", as: "font", type: "font/woff", crossOrigin: "anonymous" },
  // Reference photography is served from the Unsplash CDN until self-hosted.
  { rel: "preconnect", href: "https://images.unsplash.com" },
  { rel: "icon", href: "/favicon.png", type: "image/png" },
  { rel: "apple-touch-icon", href: "/images/brand/mark-180.png" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0b1f33" />
        <Meta />
        <Links />
        {/* With JavaScript disabled, animated content must never stay hidden. */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  // Signals that React has taken over; ends the CSS reveal fallback in app.css.
  useEffect(() => {
    document.documentElement.dataset.hydrated = "";
  }, []);

  // LazyMotion + `m` components load only the DOM animation features used.
  // reducedMotion="user": every Motion animation honours prefers-reduced-motion.
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <Outlet />
      </MotionConfig>
    </LazyMotion>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <main className="container-site section-y">
      <p className="eyebrow text-green-700">{notFound ? "404" : "Error"}</p>
      <h1 className="mt-4 text-h1">{notFound ? "Page not found" : "Something went wrong"}</h1>
      <p className="mt-4 max-w-xl text-muted">
        {notFound ? "The page you are looking for does not exist or has moved." : "Please try again in a moment."}
      </p>
      <a href="/" className="mt-8 inline-block font-semibold text-navy-600 underline underline-offset-4">
        Back to the homepage
      </a>
    </main>
  );
}
