"use client";

import { useState, useRef, FormEvent } from "react";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;
type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const submitting = useRef(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!values.name.trim()) {
      newErrors.name = "Name is required";
    } else if (values.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!values.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!values.message.trim()) {
      newErrors.message = "Message is required";
    } else if (values.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting.current) return;

    setSubmitError(null);

    if (!validate()) return;

    if (honeypotRef.current?.value) return;

    submitting.current = true;
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          honeypot: honeypotRef.current?.value || "",
        }),
      });

      if (!res.ok) {
        if (res.status === 429) {
          throw new Error("rate");
        }
        throw new Error("server");
      }

      setStatus("success");
      setValues({ name: "", email: "", message: "" });
    } catch (err) {
      if (err instanceof Error && err.message === "rate") {
        setSubmitError("Too many requests. Please try again later.");
      } else if (err instanceof TypeError) {
        setSubmitError("Network error. Please check your connection.");
      } else {
        setSubmitError("Server error. Please try again.");
      }
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  };

  const updateField = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-16 sm:grid-cols-5">
          {/* Left: section header */}
          <div className="sm:col-span-2">
            <div className="sticky top-32">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[var(--color-border-primary)]" />
                <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-fg-tertiary)]">
                  Contact
                </span>
              </div>
              <h2 className="mt-6 text-3xl font-medium leading-tight tracking-tight text-[var(--color-fg-primary)] sm:text-4xl font-primary">
                Let&apos;s work
                <br />
                <span className="text-[var(--color-fg-tertiary)]">together.</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-fg-tertiary)]">
                If something here resonates, I&apos;d love to hear from you.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="sm:col-span-3">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] px-8 py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-border-primary)]">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-fg-primary)]">
                    <path d="M4 10l4 4 8-8" />
                  </svg>
                </div>
                <p className="mt-4 text-sm text-[var(--color-fg-primary)]">
                  Message sent
                </p>
                <p className="mt-1 text-xs text-[var(--color-fg-tertiary)]">
                  I&apos;ll get back to you within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-8">
                {/* Honeypot */}
                <input
                  ref={honeypotRef}
                  type="text"
                  name="honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  aria-hidden="true"
                />

                <div className="space-y-8">
                  {/* Name */}
                  <div className="group relative border-b border-[var(--color-border-primary)] transition-colors focus-within:border-[var(--color-fg-primary)]">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={values.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="Name"
                      autoComplete="name"
                      disabled={status === "loading"}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className="w-full bg-transparent pb-3 pt-1 text-sm text-[var(--color-fg-primary)] outline-none placeholder:text-[var(--color-fg-tertiary)] disabled:opacity-50"
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-xs text-red-500">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="group relative border-b border-[var(--color-border-primary)] transition-colors focus-within:border-[var(--color-fg-primary)]">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="Email"
                      autoComplete="email"
                      disabled={status === "loading"}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className="w-full bg-transparent pb-3 pt-1 text-sm text-[var(--color-fg-primary)] outline-none placeholder:text-[var(--color-fg-tertiary)] disabled:opacity-50"
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-xs text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="group relative border-b border-[var(--color-border-primary)] transition-colors focus-within:border-[var(--color-fg-primary)]">
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={values.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      placeholder="Message"
                      autoComplete="off"
                      disabled={status === "loading"}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className="w-full resize-none bg-transparent pb-3 pt-1 text-sm text-[var(--color-fg-primary)] outline-none placeholder:text-[var(--color-fg-tertiary)] disabled:opacity-50"
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1 text-xs text-red-500">
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                {submitError && (
                  <p className="text-sm text-red-500" role="alert">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group relative inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-bg-elevated)] px-6 py-3 text-sm text-[var(--color-fg-primary)] transition-all duration-300 hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-secondary)] disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                >
                  {status === "loading" ? (
                    <span className="flex items-center gap-2">
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending
                    </span>
                  ) : (
                    <>
                      Send Message
                      <span className="-translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M5 3l4 4-4 4" />
                        </svg>
                      </span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
