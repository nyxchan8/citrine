import { Link } from "react-router";
import { Header } from "../components/Header";
import "./NotFoundPage.css";

export function NotFoundPage({ cart }) {
  return (
    <>
      <title>Page Not Found</title>

      <Header cart={cart} />

      <div className="not-found-page">
        <div className="page-title">Page not found</div>
        <div>We couldn&apos;t find the page you were looking for.</div>
        <Link className="link-primary" to="/">
          Return to home
        </Link>
      </div>
    </>
  );
}
