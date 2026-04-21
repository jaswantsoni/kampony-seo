import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";

export const metadata: Metadata = {
  title: "Sign Up Free — Start GST Billing in Minutes | Kampony",
  description: "Create your free Kampony account and start GST-compliant invoicing in minutes. No credit card required. 10 free invoices to get started.",
  alternates: { canonical: "https://www.kampony.com/signin" },
};

const AUTH_URL = "https://business.kampony.com/auth";

export default function SigninPage() {
  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden min-h-[600px]">
        <div className="absolute inset-0 z-0" style={{ backgroundImage: "url(/assets/auth-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/10 via-background/30 to-background/70" />
        <div className="container relative z-10 max-w-2xl py-24 md:py-32 text-center">
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Create your free <span className="text-gradient-hero">Kampony</span> account
            </h1>
            <p className="mt-4 text-muted-foreground text-lg">No credit card required. 10 free invoices to get started.</p>
            <div className="mt-8">
              <a href={AUTH_URL} className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 shadow-lg">
                Continue to Sign Up →
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
