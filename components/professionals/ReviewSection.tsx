interface ReviewSectionProps {
  displayName: string;
}

export function ReviewSection({ displayName }: ReviewSectionProps) {
  const firstName = displayName.split(" ")[0];

  return (
    <section aria-labelledby="reviews-heading" className="space-y-4 pt-4">
      <h2
        id="reviews-heading"
        className="font-serif font-medium text-2xl tracking-tight text-deep-slate"
      >
        Reviews
      </h2>

      <div className="rounded-[var(--radius-card,1.5rem)] border border-border-subtle bg-sand-dune/40 p-6 sm:p-7 space-y-2">
        <h3 className="text-base font-semibold text-deep-slate">
          No reviews yet
        </h3>
        <p className="text-sm text-river-silt leading-relaxed max-w-xl">
          Reviews appear here once a customer who contacted {firstName} through Jokkoo shares their experience.
        </p>
      </div>
    </section>
  );
}
