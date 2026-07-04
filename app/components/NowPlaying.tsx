"use client";

import { useEffect, useState, useRef } from "react";
import type { SpotifyTrack } from "@/lib/spotify";

const messages = [
  "in the zone",
  "big mood",
  "now spinning",
  "on easy mode",
  "barely working",
  "touching grass",
  "fueling the delulu",
  "just vibing",
  "cooldown",
  "avoiding responsibilities",
  "rotmaxxing",
];

export default function NowPlaying() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const messageRef = useRef<string | null>(null);
  const wasPlayingRef = useRef(false);

  useEffect(() => {
    import("ldrs").then(({ quantum }) => {
      quantum.register();
      setMounted(true);
    });
  }, []);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const res = await fetch("/api/spotify/now-playing");
        const json = await res.json();
        const newTrack = json.data as SpotifyTrack | null;

        if (newTrack?.isPlaying && !wasPlayingRef.current) {
          const available = messages.filter((m) => m !== messageRef.current);
          messageRef.current =
            available[Math.floor(Math.random() * available.length)];
        }

        wasPlayingRef.current = newTrack?.isPlaying ?? false;
        setTrack(newTrack);
      } catch {
        setTrack(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTrack();
    const interval = setInterval(fetchTrack, 30_000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !track || !mounted) return null;

  return (
    <a
      href={track.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-full border border-[var(--color-border-primary)] bg-[var(--color-bg-elevated)]/80 px-4 py-2 text-xs backdrop-blur-md transition-all duration-300 hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-elevated)]"
    >
      {/* Quantum animation when playing, dot when not */}
      {track.isPlaying ? (
        <l-quantum size="18" speed="3.5" color="#1DB954" />
      ) : (
        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-fg-tertiary)]" />
      )}

      {/* Text content */}
      <div className="flex flex-col">
        <span className="text-[11px] text-[var(--color-fg-tertiary)] leading-none">
          {track.isPlaying && messageRef.current
            ? messageRef.current
            : "...clocked out ig"}
        </span>
        <span className="max-w-[160px] truncate text-[11px] text-[var(--color-fg-primary)] group-hover:underline leading-tight">
          {track.title}
          <span className="text-[var(--color-fg-tertiary)]"> — {track.artist}</span>
        </span>
      </div>

      {/* Spotify icon */}
      <svg
        className="h-3.5 w-3.5 flex-shrink-0 text-[#1DB954]"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.68 18.54 12.9c.361.18.48.78.301 1.14zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    </a>
  );
}
