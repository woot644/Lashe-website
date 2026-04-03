"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function getVisitorId(): string {
  if (typeof window === "undefined") return "";

  let id = localStorage.getItem("sha_vid");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("sha_vid", id);
  }
  return id;
}

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Skip admin and dashboard pages
    if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard") || pathname.startsWith("/auth")) {
      return;
    }

    const visitorId = getVisitorId();
    if (!visitorId) return;

    // Small delay to not block page render
    const timeout = setTimeout(() => {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: pathname,
          referrer: document.referrer || null,
          visitorId,
        }),
      }).catch(() => {}); // Silently fail
    }, 500);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
