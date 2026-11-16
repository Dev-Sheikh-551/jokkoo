"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ONBOARDING_LIVE } from "@/lib/onboarding";
import { Info, AlertCircle, Eye, EyeOff } from "lucide-react";
import { z } from "zod";

const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "Please enter your phone number or email")
    .min(3, "Phone number or email must be at least 3 characters"),
  password: z
    .string()
    .min(1, "Please enter your password")
    .min(8, "Password must be at least 8 characters"),
});

type LoginFormErrors = {
  identifier?: string;
  password?: string;
};

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedMessage(null);

    const result = loginSchema.safeParse({ identifier, password });
    if (!result.success) {
      const fieldErrors: LoginFormErrors = {};
      for (const issue of result.error.issues) {
        if (issue.path[0] === "identifier" && !fieldErrors.identifier) {
          fieldErrors.identifier = issue.message;
        } else if (issue.path[0] === "password" && !fieldErrors.password) {
          fieldErrors.password = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    // While ONBOARDING_LIVE is false, preview only — no network request
    if (!ONBOARDING_LIVE) {
      setSubmittedMessage("Preview only: sign in is not available yet. Accounts will launch soon.");
      return;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-warm-bone text-deep-slate">
      <Header />
      <main className="flex-1 py-12 sm:py-20 flex items-center justify-center px-4">
        <div className="w-full max-w-[440px] space-y-6">
          <div className="rounded-2xl border border-border-subtle bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <div className="text-center space-y-1">
              <h1 className="font-serif font-medium text-3xl text-deep-slate">
                Sign in
              </h1>
            </div>

            {/* Preview Banner while ONBOARDING_LIVE is false */}
            {!ONBOARDING_LIVE && (
              <div className="rounded-xl border border-border-subtle bg-sand-dune/40 p-4 text-xs text-river-silt flex items-start gap-2.5">
                <Info className="h-4 w-4 text-river-silt shrink-0 mt-0.5" />
                <p>Preview only: sign in is not available yet.</p>
              </div>
            )}

            {/* Submission Feedback Message (Preview Mode) */}
            {submittedMessage && (
              <div
                role="status"
                className="rounded-xl border border-laterite/20 bg-laterite-light p-4 text-xs text-laterite-dark flex items-start gap-2.5"
              >
                <Info className="h-4 w-4 shrink-0 mt-0.5" />
                <p>{submittedMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Identifier Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="login-identifier"
                  className="block text-sm font-semibold text-deep-slate"
                >
                  Phone number or email
                </label>
                <input
                  id="login-identifier"
                  type="text"
                  autoComplete="username"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    if (errors.identifier) {
                      setErrors((prev) => ({ ...prev, identifier: undefined }));
                    }
                  }}
                  aria-describedby={errors.identifier ? "login-identifier-error" : undefined}
                  aria-invalid={Boolean(errors.identifier)}
                  placeholder="e.g. +220 700 1234 or email"
                  className={`w-full h-12 min-h-[44px] rounded-xl border bg-white px-3.5 text-sm text-deep-slate placeholder:text-river-silt/60 outline-none transition-colors ${
                    errors.identifier
                      ? "border-laterite focus:ring-1 focus:ring-laterite"
                      : "border-border-subtle focus:border-laterite focus:ring-1 focus:ring-laterite"
                  }`}
                />
                {errors.identifier && (
                  <p
                    id="login-identifier-error"
                    className="text-xs text-laterite flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errors.identifier}</span>
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="login-password"
                    className="text-sm font-semibold text-deep-slate"
                  >
                    Password
                  </label>
                  <Link
                    href="/login/help"
                    className="text-xs font-medium text-laterite hover:underline underline-offset-2 min-h-[44px] inline-flex items-center"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) {
                        setErrors((prev) => ({ ...prev, password: undefined }));
                      }
                    }}
                    aria-describedby={errors.password ? "login-password-error" : undefined}
                    aria-invalid={Boolean(errors.password)}
                    placeholder="Enter your password"
                    className={`w-full h-12 min-h-[44px] rounded-xl border bg-white pl-3.5 pr-20 text-sm text-deep-slate placeholder:text-river-silt/60 outline-none transition-colors ${
                      errors.password
                        ? "border-laterite focus:ring-1 focus:ring-laterite"
                        : "border-border-subtle focus:border-laterite focus:ring-1 focus:ring-laterite"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-pressed={showPassword}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-1 top-1 bottom-1 px-3 flex items-center gap-1.5 text-xs font-medium text-river-silt hover:text-deep-slate transition-colors cursor-pointer min-h-[44px]"
                  >
                    {showPassword ? (
                      <>
                        <EyeOff className="h-4 w-4" />
                        <span>Hide</span>
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4" />
                        <span>Show</span>
                      </>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p
                    id="login-password-error"
                    className="text-xs text-laterite flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-12 min-h-[48px] rounded-full bg-laterite text-white text-sm font-semibold hover:bg-laterite-dark active:bg-laterite-dark transition-colors cursor-pointer shadow-xs"
              >
                Sign in
              </button>
            </form>

            {/* Footer Navigation Links */}
            <div className="pt-4 border-t border-border-subtle text-center text-xs text-river-silt space-y-2">
              <p>
                New here?{" "}
                <Link
                  href="/register"
                  className="font-medium text-deep-slate hover:text-laterite hover:underline underline-offset-2 inline-flex items-center min-h-[44px]"
                >
                  Create an account
                </Link>
              </p>
              <p>
                Offer your services?{" "}
                <Link
                  href="/join"
                  className="font-medium text-deep-slate hover:text-laterite hover:underline underline-offset-2 inline-flex items-center min-h-[44px]"
                >
                  Build your profile
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
