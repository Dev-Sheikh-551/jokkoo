"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CATEGORIES } from "@/data/categories";
import { GAMBIAN_LOCATIONS } from "@/data/locations";
import { Button } from "@/components/common/Button";

const proApplicationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  businessName: z.string().optional(),
  categorySlug: z.string().min(1, "Please select your primary trade category"),
  baseLocation: z.string().min(1, "Please select your primary operational base"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  whatsappNumber: z.string().min(7, "Please enter a valid WhatsApp contact"),
  yearsExperience: z.string().min(1, "Please enter years of experience"),
  bio: z.string().min(20, "Please provide a brief description of your trade practice (min 20 characters)"),
  acceptsVerification: z.boolean().refine((val) => val === true, {
    message: "You must agree to the identity verification protocol",
  }),
});

type ProApplicationForm = z.infer<typeof proApplicationSchema>;

export default function JoinPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProApplicationForm>({
    resolver: zodResolver(proApplicationSchema),
    defaultValues: {
      fullName: "",
      businessName: "",
      categorySlug: "",
      baseLocation: "",
      phone: "+220 ",
      whatsappNumber: "+220 ",
      yearsExperience: "3",
      bio: "",
      acceptsVerification: false,
    },
  });

  const onSubmit = async (_data: ProApplicationForm) => {
    // Application submission simulation
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-warm-bone text-deep-slate">
      <Header />
      <main className="flex-1 py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10 text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-laterite">
              Professional Partnership
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-deep-slate">
              List Your Trade Practice on Jokkoo
            </h1>
            <p className="text-sm text-river-silt leading-relaxed">
              Join The Gambia’s verified network of skilled artisans. Showcase your past work, set your own rates, and connect directly with serious local and diaspora clients.
            </p>
          </div>

          {isSubmitted ? (
            <div className="rounded-[3px] border border-border-subtle bg-warm-bone p-8 text-center space-y-4 shadow-sm animate-in fade-in-50">
              <div className="h-14 w-14 mx-auto rounded-full bg-sand-dune flex items-center justify-center text-laterite">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-deep-slate">
                Application Received for Verification
              </h2>
              <p className="text-sm text-river-silt max-w-md mx-auto leading-relaxed">
                Thank you for applying to Jokkoo. Our verification team in Kanifing will review your submission and contact you via WhatsApp to verify your Gambian identification and workshop location.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <Button href="/explore" variant="primary" size="md">
                  Explore Directory
                </Button>
                <Button href="/" variant="outline" size="md">
                  Return to Homepage
                </Button>
              </div>
            </div>
          ) : (
            <div className="rounded-[3px] border border-border-subtle bg-warm-bone p-6 sm:p-10 shadow-sm">
              <div className="mb-8 p-4 rounded-[2px] bg-sand-dune/40 border border-border-subtle flex items-start gap-3 text-xs text-river-silt">
                <ShieldCheck className="h-5 w-5 text-laterite shrink-0 mt-0.5" />
                <div>
                  <strong className="text-deep-slate">Verification Standard:</strong> To be published on Jokkoo, all professionals must provide a valid Gambian National ID Card, Alien Registration, or Business Registration certificate. Verification does not guarantee workmanship.
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-deep-slate block">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      {...register("fullName")}
                      placeholder="e.g. Modou Camara"
                      className="w-full px-3 py-2 text-sm bg-sand-dune/30 border border-border-subtle rounded-[2px] text-deep-slate focus:outline-none focus:border-laterite"
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-laterite">{errors.fullName.message}</p>
                    )}
                  </div>

                  {/* Business Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-deep-slate block">
                      Business or Workshop Name (Optional)
                    </label>
                    <input
                      type="text"
                      {...register("businessName")}
                      placeholder="e.g. Camara Power Systems"
                      className="w-full px-3 py-2 text-sm bg-sand-dune/30 border border-border-subtle rounded-[2px] text-deep-slate focus:outline-none focus:border-laterite"
                    />
                  </div>

                  {/* Primary Trade Category */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-deep-slate block">
                      Primary Trade Category *
                    </label>
                    <select
                      {...register("categorySlug")}
                      className="w-full px-3 py-2 text-sm bg-sand-dune/30 border border-border-subtle rounded-[2px] text-deep-slate focus:outline-none focus:border-laterite cursor-pointer"
                    >
                      <option value="">Select your craft</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat.slug} value={cat.slug}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    {errors.categorySlug && (
                      <p className="text-[11px] text-laterite">{errors.categorySlug.message}</p>
                    )}
                  </div>

                  {/* Primary Operational Base */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-deep-slate block">
                      Operational Base in The Gambia *
                    </label>
                    <select
                      {...register("baseLocation")}
                      className="w-full px-3 py-2 text-sm bg-sand-dune/30 border border-border-subtle rounded-[2px] text-deep-slate focus:outline-none focus:border-laterite cursor-pointer"
                    >
                      <option value="">Select primary town / area</option>
                      {GAMBIAN_LOCATIONS.filter((l) => l.id !== "all").map((loc) => (
                        <option key={loc.id} value={loc.name}>
                          {loc.name} ({loc.region})
                        </option>
                      ))}
                    </select>
                    {errors.baseLocation && (
                      <p className="text-[11px] text-laterite">{errors.baseLocation.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-deep-slate block">
                      Phone Number (Direct Calls) *
                    </label>
                    <input
                      type="text"
                      {...register("phone")}
                      className="w-full px-3 py-2 text-sm bg-sand-dune/30 border border-border-subtle rounded-[2px] text-deep-slate focus:outline-none focus:border-laterite"
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-laterite">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* WhatsApp */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-deep-slate block">
                      WhatsApp Contact Number *
                    </label>
                    <input
                      type="text"
                      {...register("whatsappNumber")}
                      className="w-full px-3 py-2 text-sm bg-sand-dune/30 border border-border-subtle rounded-[2px] text-deep-slate focus:outline-none focus:border-laterite"
                    />
                    {errors.whatsappNumber && (
                      <p className="text-[11px] text-laterite">{errors.whatsappNumber.message}</p>
                    )}
                  </div>
                </div>

                {/* Years Experience */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-deep-slate block">
                    Years of Professional Experience in This Trade *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    {...register("yearsExperience")}
                    className="w-full max-w-xs px-3 py-2 text-sm bg-sand-dune/30 border border-border-subtle rounded-[2px] text-deep-slate focus:outline-none focus:border-laterite"
                  />
                  {errors.yearsExperience && (
                    <p className="text-[11px] text-laterite">{errors.yearsExperience.message}</p>
                  )}
                </div>

                {/* Bio / Services */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-deep-slate block">
                    Describe Your Trade Practice & Typical Services *
                  </label>
                  <textarea
                    rows={4}
                    {...register("bio")}
                    placeholder="Describe your training, certifications, equipment, and typical projects you handle across The Gambia..."
                    className="w-full px-3 py-2 text-sm bg-sand-dune/30 border border-border-subtle rounded-[2px] text-deep-slate focus:outline-none focus:border-laterite"
                  />
                  {errors.bio && (
                    <p className="text-[11px] text-laterite">{errors.bio.message}</p>
                  )}
                </div>

                {/* Verification Agreement */}
                <div className="pt-2 border-t border-border-subtle">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      {...register("acceptsVerification")}
                      className="h-4 w-4 mt-0.5 rounded-[2px] border-border-subtle text-laterite focus:ring-laterite accent-laterite"
                    />
                    <span className="text-xs text-river-silt leading-relaxed">
                      I agree to submit a valid Gambian ID or business registration for identity verification. I understand that Jokkoo lists only verified professionals and maintains transparent standards for customer reviews.
                    </span>
                  </label>
                  {errors.acceptsVerification && (
                    <p className="text-[11px] text-laterite mt-1">{errors.acceptsVerification.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? "Submitting Application..." : "Submit Application for Verification"}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
