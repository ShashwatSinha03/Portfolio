import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-fg-primary)]">
        404
      </h1>
      <p className="mt-4 text-[var(--color-fg-secondary)]">
        This page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 text-sm text-[var(--color-fg-tertiary)] transition-colors hover:text-[var(--color-fg-primary)]"
      >
        Go home
      </Link>
    </div>
  );
}
