"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Lock, Phone } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/common/Button";

export default function LoginPage() {
  const [accountType, setAccountType] = useState<"client" | "professional">("client");
  const [phone, setPhone] = useState("+220 ");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-warm-bone text-deep-slate">
      <Header />
      <main className="flex-1 py-16 sm:py-20 flex items-center justify-center">
        <div className="w-full max-w-md px-4 sm:px-6">
          <div className="rounded-[3px] border border-border-subtle bg-warm-bone p-8 shadow-sm space-y-6">
            <div className="text-center space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-laterite">
                Jokkoo Account
              </span>
              <h1 className="text-2xl font-bold tracking-tight text-deep-slate">
                Sign In to Your Account
              </h1>
              <p className="text-xs text-river-silt">
                Access your bookings, saved artisans, or manage your professional listing.
              </p>
            </div>

            {/* Account Type Toggle */}
            <div className="grid grid-cols-2 p-1 bg-sand-dune rounded-[2px] text-xs font-medium border border-border-subtle">
              <button
                type="button"
                onClick={() => setAccountType("client")}
                className={`py-1.5 rounded-[2px] transition-colors ${
                  accountType === "client"
                    ? "bg-warm-bone text-deep-slate font-semibold shadow-xs"
                    : "text-river-silt hover:text-deep-slate"
                }`}
              >
                Customer / Client
              </button>
              <button
                type="button"
                onClick={() => setAccountType("professional")}
                className={`py-1.5 rounded-[2px] transition-colors ${
                  accountType === "professional"
                    ? "bg-warm-bone text-deep-slate font-semibold shadow-xs"
                    : "text-river-silt hover:text-deep-slate"
                }`}
              >
                Trade Professional
              </button>
            </div>

            {isSubmitted ? (
              <div className="p-4 rounded-[2px] bg-sand-dune/60 border border-border-subtle text-center text-xs text-river-silt space-y-2">
                <p className="font-semibold text-deep-slate">
                  Authentication Milestone Preview
                </p>
                <p>
                  Database and Supabase authentication integration will be connected in Phase 04.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-2"
                >
                  Return to Form
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-deep-slate block">
                    Phone Number or Email
                  </label>
                  <div className="relative">
                    <Phone className="h-3.5 w-3.5 text-river-silt absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="+220 700 0000"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-sand-dune/30 border border-border-subtle rounded-[2px] text-deep-slate focus:outline-none focus:border-laterite"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-semibold text-deep-slate">
                      Password
                    </label>
                    <Link
                      href="#"
                      className="text-river-silt hover:text-laterite hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="h-3.5 w-3.5 text-river-silt absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-sand-dune/30 border border-border-subtle rounded-[2px] text-deep-slate focus:outline-none focus:border-laterite"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                >
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            )}

            <div className="text-center pt-2 border-t border-border-subtle text-xs text-river-silt space-y-2">
              <p>
                Don&apos;t have an account yet?{" "}
                <Link
                  href="/register"
                  className="font-medium text-laterite hover:underline"
                >
                  Create Client Account
                </Link>
              </p>
              <p>
                Are you an artisan?{" "}
                <Link
                  href="/join"
                  className="font-medium text-deep-slate hover:text-laterite hover:underline"
                >
                  Apply to List Your Services
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
