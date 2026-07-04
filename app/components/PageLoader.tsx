"use client";

import { useEffect, useState, useRef } from "react";

export default function PageLoader({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("ldrs").then(({ hourglass }) => {
      hourglass.register();
    });
  }, []);

  useEffect(() => {
    const handleLoad = () => {
      // Wait a tick for fonts and layout to settle
      requestAnimationFrame(() => {
        setFadeOut(true);
        setTimeout(() => setLoaded(true), 600);
      });
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <>
      {/* Loader overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--color-bg-primary)] transition-opacity duration-600 ease-out"
        style={{
          opacity: fadeOut ? 0 : 1,
          pointerEvents: fadeOut ? "none" : "auto",
        }}
      >
        <l-hourglass size="35" bg-opacity="0.1" speed="1.75" color="#a1a1aa" />
      </div>

      {/* Content — hidden until fade-out completes */}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {children}
      </div>
    </>
  );
}
