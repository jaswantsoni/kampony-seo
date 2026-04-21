import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";

export const metadata: Metadata = {
  title: "Login to Kampony — GST Billing Dashboard",
  description: "Log in to your Kampony account to manage GST invoices, inventory, e-way bills and reports.",
  alternates: { canonical: "https://www.kampony.com/login" },
};

const AUTH_URL = "https://business.kampony.com/auth";

export default function LoginPage() {
  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden min-h-[600px]">
        <div className="absolute inset-0 z-0" style={{ backgroundImage: "url(/assets/auth-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/10 via-background/30 to-background/70" />
        <div className="container relative z-10 max-w-2xl py-24 md:py-32 text-center">
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Welcome back to <span className="text-gradient-hero">Kampony</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-lg">Sign in to your GST billing dashboard.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a href={AUTH_URL} className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 shadow-lg">
                Continue to Login →
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
