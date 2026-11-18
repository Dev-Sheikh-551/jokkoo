import Link from "next/link";

interface MobileMenuDrawerProps {
  navLinks: readonly { href: string; label: string }[];
  onClose: () => void;
}

export default function MobileMenuDrawer({
  navLinks,
  onClose,
}: MobileMenuDrawerProps) {
  return (
    <div className="md:hidden border-b border-border-subtle bg-warm-bone px-4 pt-3 pb-6 animate-in fade-in-50 duration-150 motion-reduce:animate-none">
      <nav className="flex flex-col space-y-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="flex min-h-[44px] items-center px-3 py-2 text-base font-medium text-deep-slate hover:bg-sand-dune rounded-[3px] transition-colors"
          >
            {link.label}
          </Link>
        ))}

        <Link
          href="/login"
          onClick={onClose}
          className="flex min-h-[44px] items-center px-3 py-2 text-base font-medium text-deep-slate hover:bg-sand-dune rounded-[3px] transition-colors"
        >
          Sign in
        </Link>

        <div className="pt-4 border-t border-border-subtle flex flex-col gap-2.5">
          <Link
            href="/join"
            onClick={onClose}
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-deep-slate px-5 py-3 text-sm font-semibold text-warm-bone transition-colors hover:bg-deep-slate/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laterite"
          >
            Join as a professional
          </Link>
        </div>
      </nav>
    </div>
  );
}
