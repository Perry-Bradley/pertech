"use client";

import { useEffect, useState } from "react";

/**
 * True on devices without hover capability (touch screens).
 * Use this to trigger "hover-like" visuals via scroll-into-view on mobile.
 */
export function useNoHover() {
  const [noHover, setNoHover] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: none)");
    setNoHover(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setNoHover(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return noHover;
}
