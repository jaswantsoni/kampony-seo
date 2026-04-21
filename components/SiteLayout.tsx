import Link from "next/link";

const AUTH_URL = "https://business.kampony.com/auth";

const nav = [
  { href: "/features", label: "Features" },
  { href: "/templates", label: "Templates" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/faqs", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <nav className="container flex items-center justify-between py-4" aria-label="Primary">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <img src="/headerLogo.png" alt="Kampony" className="h-9" />
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="hover:text-foreground transition-colors">
                {n.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login" className="text-sm px-3 py-1.5 rounded-md hover:bg-secondary transition-colors">
              Login
            </Link>
            <a href={AUTH_URL} className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-md font-medium">
              Start Today
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-footer text-footer-foreground mt-auto">
        <div className="container py-14 grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="/footerLogo.png" alt="Kampony" className="h-12 opacity-80" />
            </div>
            <p className="text-sm text-footer-muted leading-relaxed">
              Cloud-based GST billing & business management built for Indian MSMEs.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-footer-heading mb-3 text-sm">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/features" className="hover:text-footer-heading transition-colors">Features</Link></li>
              <li><Link href="/#pricing" className="hover:text-footer-heading transition-colors">Pricing</Link></li>
              <li><Link href="/templates" className="hover:text-footer-heading transition-colors">Templates</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-footer-heading mb-3 text-sm">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="hover:text-footer-heading transition-colors">Contact</Link></li>
              <li><Link href="/faqs" className="hover:text-footer-heading transition-colors">FAQ</Link></li>
              <li><Link href="/login" className="hover:text-footer-heading transition-colors">Login</Link></li>
              <li><Link href="/privacy" className="hover:text-footer-heading transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-footer-heading transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-footer-heading mb-3 text-sm">Get started</h4>
            <a href={AUTH_URL} className="block w-full text-center text-sm bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium">
              Start Free Today
            </a>
            <p className="mt-3 text-xs text-footer-muted">Made in India 🇮🇳</p>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="container py-5 text-xs text-footer-muted flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>© {new Date().getFullYear()} Kampony. All rights reserved.</span>
            <div className="flex gap-4">
              <Link href="/terms" className="hover:text-footer-heading transition-colors">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-footer-heading transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
