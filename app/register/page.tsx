"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, User, Phone, Mail, Lock, MapPin } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GAMBIAN_LOCATIONS } from "@/data/locations";
import { Button } from "@/components/common/Button";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("+220 ");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
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
                Customer Registration
              </span>
              <h1 className="text-2xl font-bold tracking-tight text-deep-slate">
                Create Client Account
              </h1>
              <p className="text-xs text-river-silt">
                Connect directly with verified Gambian trade professionals.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-4 rounded-[2px] bg-sand-dune/60 border border-border-subtle text-center text-xs text-river-silt space-y-2">
                <p className="font-semibold text-deep-slate">
                  Registration Preview
                </p>
                <p>
                  Database storage and SMS/WhatsApp OTP verification will be integrated with Supabase in the next phase.
                </p>
                <Button
                  href="/explore"
                  variant="primary"
                  size="sm"
                  className="mt-2"
                >
                  Explore Professionals
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-deep-slate block">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="h-3.5 w-3.5 text-river-silt absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      placeholder="e.g. Fatou Ceesay"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-sand-dune/30 border border-border-subtle rounded-[2px] text-deep-slate focus:outline-none focus:border-laterite"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-deep-slate block">
                    Phone Number (WhatsApp or Call) *
                  </label>
                  <div className="relative">
                    <Phone className="h-3.5 w-3.5 text-river-silt absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2 text-sm bg-sand-dune/30 border border-border-subtle rounded-[2px] text-deep-slate focus:outline-none focus:border-laterite"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-deep-slate block">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="h-3.5 w-3.5 text-river-silt absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="fatou@example.com"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-sand-dune/30 border border-border-subtle rounded-[2px] text-deep-slate focus:outline-none focus:border-laterite"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-deep-slate block">
                    Your Neighborhood / District *
                  </label>
                  <div className="relative">
                    <MapPin className="h-3.5 w-3.5 text-laterite absolute left-3 top-3 pointer-events-none" />
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2 text-sm bg-sand-dune/30 border border-border-subtle rounded-[2px] text-deep-slate focus:outline-none focus:border-laterite cursor-pointer"
                    >
                      <option value="">Select your area</option>
                      {GAMBIAN_LOCATIONS.filter((l) => l.id !== "all").map((loc) => (
                        <option key={loc.id} value={loc.name}>
                          {loc.name} ({loc.region})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-deep-slate block">
                    Create Password *
                  </label>
                  <div className="relative">
                    <Lock className="h-3.5 w-3.5 text-river-silt absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="At least 8 characters"
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
                  <span>Create Account</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            )}

            <div className="text-center pt-2 border-t border-border-subtle text-xs text-river-silt space-y-2">
              <p>
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-laterite hover:underline"
                >
                  Sign In
                </Link>
              </p>
              <p>
                Are you an artisan or contractor?{" "}
                <Link
                  href="/join"
                  className="font-medium text-deep-slate hover:text-laterite hover:underline"
                >
                  List Your Trade Practice
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
