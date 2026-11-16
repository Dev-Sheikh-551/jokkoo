"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ONBOARDING_LIVE } from "@/lib/onboarding";
import { normalizeGambianPhone } from "@/lib/onboarding/phone";
import { GAMBIAN_LOCATIONS } from "@/data/locations";
import { Info, AlertCircle, Eye, EyeOff } from "lucide-react";
import { z } from "zod";

const registerSchema = z.object({
  fullName: z
    .string()
    .min(1, "Please enter your name")
    .min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(1, "Please enter your phone number")
    .regex(/^\+220\d{7}$/, "Enter a valid 7-digit Gambian phone number"),
  email: z
    .string()
    .email("Enter a valid email address")
    .optional()
    .or(z.literal("")),
  location: z.string().optional(),
  password: z
    .string()
    .min(1, "Please enter a password")
    .min(8, "Password must be at least 8 characters"),
});

type RegisterFormErrors = {
  fullName?: string;
  phone?: string;
  email?: string;
  location?: string;
  password?: string;
};

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [phoneLocal, setPhoneLocal] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { localDigits } = normalizeGambianPhone(e.target.value);
    setPhoneLocal(localDigits);
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedMessage(null);

    const fullPhone = phoneLocal ? `+220${phoneLocal}` : "";

    const result = registerSchema.safeParse({
      fullName,
      phone: fullPhone,
      email,
      location,
      password,
    });

    if (!result.success) {
      const fieldErrors: RegisterFormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof RegisterFormErrors;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    // While ONBOARDING_LIVE is false, preview only — no network request
    if (!ONBOARDING_LIVE) {
      setSubmittedMessage("Preview only: registration is not available yet. Accounts will launch soon.");
      return;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-warm-bone text-deep-slate">
      <Header />
      <main className="flex-1 py-12 sm:py-20 flex items-center justify-center px-4">
        <div className="w-full max-w-[440px] space-y-6">
          <div className="rounded-2xl border border-border-subtle bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <div className="text-center space-y-1.5">
              <h1 className="font-serif font-medium text-3xl text-deep-slate">
                Create an account
              </h1>
              <p className="text-xs text-river-silt leading-relaxed">
                You can browse and contact professionals without an account.
              </p>
            </div>

            {/* Preview Banner while ONBOARDING_LIVE is false */}
            {!ONBOARDING_LIVE && (
              <div className="rounded-xl border border-border-subtle bg-sand-dune/40 p-4 text-xs text-river-silt flex items-start gap-2.5">
                <Info className="h-4 w-4 text-river-silt shrink-0 mt-0.5" />
                <p>Preview only: customer registration is not available yet.</p>
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

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Name Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="register-name"
                  className="block text-sm font-semibold text-deep-slate"
                >
                  Your name
                </label>
                <input
                  id="register-name"
                  type="text"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) {
                      setErrors((prev) => ({ ...prev, fullName: undefined }));
                    }
                  }}
                  aria-describedby={errors.fullName ? "register-name-error" : undefined}
                  aria-invalid={Boolean(errors.fullName)}
                  placeholder="e.g. Fatou Ceesay"
                  className={`w-full h-12 min-h-[44px] rounded-xl border bg-white px-3.5 text-sm text-deep-slate placeholder:text-river-silt/60 outline-none transition-colors ${
                    errors.fullName
                      ? "border-laterite focus:ring-1 focus:ring-laterite"
                      : "border-border-subtle focus:border-laterite focus:ring-1 focus:ring-laterite"
                  }`}
                />
                {errors.fullName && (
                  <p
                    id="register-name-error"
                    className="text-xs text-laterite flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Phone Field (+220 fixed prefix) */}
              <div className="space-y-1.5">
                <label
                  htmlFor="register-phone"
                  className="block text-sm font-semibold text-deep-slate"
                >
                  Phone number
                </label>
                <div
                  className={`flex rounded-xl border bg-white overflow-hidden transition-colors ${
                    errors.phone
                      ? "border-laterite ring-1 ring-laterite"
                      : "border-border-subtle focus-within:border-laterite focus-within:ring-1 focus-within:ring-laterite"
                  }`}
                >
                  <span className="inline-flex items-center px-3.5 bg-sand-dune/40 border-r border-border-subtle text-sm font-semibold text-deep-slate select-none">
                    +220
                  </span>
                  <input
                    id="register-phone"
                    type="tel"
                    autoComplete="tel-national"
                    value={phoneLocal}
                    onChange={handlePhoneChange}
                    aria-describedby={errors.phone ? "register-phone-error" : undefined}
                    aria-invalid={Boolean(errors.phone)}
                    placeholder="e.g. 700 1234"
                    className="w-full h-12 min-h-[44px] px-3.5 text-sm text-deep-slate placeholder:text-river-silt/60 outline-none"
                  />
                </div>
                {errors.phone && (
                  <p
                    id="register-phone-error"
                    className="text-xs text-laterite flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Email Field (optional) */}
              <div className="space-y-1.5">
                <label
                  htmlFor="register-email"
                  className="block text-sm font-semibold text-deep-slate"
                >
                  Email <span className="font-normal text-river-silt">(optional)</span>
                </label>
                <input
                  id="register-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      setErrors((prev) => ({ ...prev, email: undefined }));
                    }
                  }}
                  aria-describedby={errors.email ? "register-email-error" : undefined}
                  aria-invalid={Boolean(errors.email)}
                  placeholder="e.g. fatou@example.com"
                  className={`w-full h-12 min-h-[44px] rounded-xl border bg-white px-3.5 text-sm text-deep-slate placeholder:text-river-silt/60 outline-none transition-colors ${
                    errors.email
                      ? "border-laterite focus:ring-1 focus:ring-laterite"
                      : "border-border-subtle focus:border-laterite focus:ring-1 focus:ring-laterite"
                  }`}
                />
                {errors.email && (
                  <p
                    id="register-email-error"
                    className="text-xs text-laterite flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Area Select (optional) */}
              <div className="space-y-1.5">
                <label
                  htmlFor="register-location"
                  className="block text-sm font-semibold text-deep-slate"
                >
                  Your area <span className="font-normal text-river-silt">(optional)</span>
                </label>
                <select
                  id="register-location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full h-12 min-h-[44px] rounded-xl border border-border-subtle bg-white px-3.5 text-sm text-deep-slate focus:border-laterite focus:ring-1 focus:ring-laterite outline-none cursor-pointer"
                >
                  <option value="">Select your town or area</option>
                  {GAMBIAN_LOCATIONS.filter((l) => l.id !== "all").map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="register-password"
                  className="block text-sm font-semibold text-deep-slate"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) {
                        setErrors((prev) => ({ ...prev, password: undefined }));
                      }
                    }}
                    aria-describedby={errors.password ? "register-password-error" : undefined}
                    aria-invalid={Boolean(errors.password)}
                    placeholder="At least 8 characters"
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
                    id="register-password-error"
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
                className="w-full h-12 min-h-[48px] rounded-full bg-laterite text-white text-sm font-semibold hover:bg-laterite-dark active:bg-laterite-dark transition-colors cursor-pointer shadow-xs mt-2"
              >
                Create account
              </button>
            </form>

            {/* Footer Navigation Links */}
            <div className="pt-4 border-t border-border-subtle text-center text-xs text-river-silt space-y-2">
              <p>
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-deep-slate hover:text-laterite hover:underline underline-offset-2 inline-flex items-center min-h-[44px]"
                >
                  Sign in
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
