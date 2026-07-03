"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-bg-primary)] px-6">
      <h2 className="text-lg font-medium text-[var(--color-fg-primary)]">
        Something went wrong
      </h2>
      <p className="mt-2 text-sm text-[var(--color-fg-secondary)]">
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        onClick={() => reset()}
        className="mt-6 rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-bg-elevated)] px-4 py-2 text-sm text-[var(--color-fg-primary)] transition-all hover:bg-[var(--color-bg-secondary)]"
      >
        Try again
      </button>
    </div>
  );
}
