import { useEffect } from "react";
import { useLocation } from "react-router";

function ScrollToTop() {
  const { pathname } = useLocation();

  // React Router keeps the browser's scroll position on navigation, so without
  // this a route change can land the new page scrolled halfway down.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
