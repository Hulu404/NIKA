import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    ym?: (id: number, action: string, url?: string, options?: object) => void;
  }
}

const METRIKA_ID = 108521860;

export default function MetrikaTracker() {
  const location = useLocation();
  useEffect(() => {
    if (typeof window.ym === "function") {
      window.ym(METRIKA_ID, "hit", window.location.href);
    }
  }, [location.pathname, location.search]);
  return null;
}
