import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import { Mail, MessageCircle, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Kampony — GST Billing Support for Indian MSMEs",
  description: "Get in touch with the Kampony team for GST billing support, sales questions, partnerships and Telegram bot help. We respond within one business day.",
  alternates: { canonical: "https://www.kampony.com/contact" },
};

export default function ContactPage() {
  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ backgroundImage: "url(/assets/contact-bg.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/10 via-background/30 to-background/70" />
        <div className="container relative z-10 max-w-3xl py-16 md:py-24">
          <header className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">Contact</span>
            <div className="glass-card rounded-3xl p-6 md:p-10 inline-block">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">We'd love to <span className="text-gradient-hero">hear from you</span></h1>
              <p className="mt-4 text-muted-foreground text-lg">Questions about features, pricing or onboarding? Reach out — we usually reply within one business day.</p>
            </div>
          </header>
          <div className="grid md:grid-cols-3 gap-5">
            <a href="mailto:support@manavly.com" className="rounded-2xl border border-border/80 bg-card/88 backdrop-blur-sm p-6 hover:shadow-lg transition-all hover:-translate-y-1">
              <Mail className="h-6 w-6 text-primary mb-3" />
              <h2 className="font-semibold">Email</h2>
              <p className="text-sm text-muted-foreground mt-1">support@manavly.com</p>
            </a>
            <a href="https://t.me/kampony_assistant_bot" className="rounded-2xl border border-border/80 bg-card/88 backdrop-blur-sm p-6 hover:shadow-lg transition-all hover:-translate-y-1">
              <MessageCircle className="h-6 w-6 text-accent mb-3" />
              <h2 className="font-semibold">Telegram</h2>
              <p className="text-sm text-muted-foreground mt-1">Chat with our bot 24×7</p>
            </a>
            <a href="https://www.kampony.com" className="rounded-2xl border border-border/80 bg-card/88 backdrop-blur-sm p-6 hover:shadow-lg transition-all hover:-translate-y-1">
              <Globe className="h-6 w-6 text-highlight mb-3" />
              <h2 className="font-semibold">Website</h2>
              <p className="text-sm text-muted-foreground mt-1">kampony.com</p>
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
