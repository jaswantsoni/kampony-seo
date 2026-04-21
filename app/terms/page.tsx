import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";

export const metadata: Metadata = {
  title: "Terms of Service — Kampony",
  description: "Read Kampony's Terms of Service. Understand your rights and responsibilities when using our GST billing platform.",
  alternates: { canonical: "https://www.kampony.com/terms" },
};

export default function TermsPage() {
  return (
    <SiteLayout>
      <div className="container max-w-3xl py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground text-sm mb-8">Last updated: April 2025</p>
        <div className="prose prose-gray max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using Kampony ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.</p>
          <h2>2. Description of Service</h2>
          <p>Kampony is a cloud-based GST billing and business management platform for Indian MSMEs. It provides tools for creating invoices, managing inventory, generating e-way bills, and tracking payments.</p>
          <h2>3. Account Registration</h2>
          <p>You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your credentials and for all activity under your account.</p>
          <h2>4. Subscription & Payments</h2>
          <p>Kampony offers Free, Basic, and Premium plans. Paid plans are billed monthly or yearly. All payments are processed securely via Razorpay. Subscriptions auto-renew unless cancelled before the renewal date.</p>
          <h2>5. Acceptable Use</h2>
          <p>You agree not to misuse the Service, including but not limited to: generating fraudulent invoices, violating GST laws, attempting to reverse-engineer the platform, or using the Service for any unlawful purpose.</p>
          <h2>6. Data & Privacy</h2>
          <p>Your data is stored securely in the cloud. We do not sell your data to third parties. Please refer to our <a href="/privacy" className="text-primary underline">Privacy Policy</a> for full details.</p>
          <h2>7. Intellectual Property</h2>
          <p>All content, features, and functionality of Kampony are owned by Manavly Technologies and are protected by applicable intellectual property laws.</p>
          <h2>8. Limitation of Liability</h2>
          <p>Kampony is provided "as is". We are not liable for any indirect, incidental, or consequential damages arising from your use of the Service.</p>
          <h2>9. Termination</h2>
          <p>We reserve the right to suspend or terminate accounts that violate these Terms. You may cancel your account at any time from the billing settings.</p>
          <h2>10. Governing Law</h2>
          <p>These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in India.</p>
          <h2>11. Contact</h2>
          <p>For questions about these Terms, contact us at <a href="mailto:support@manavly.com" className="text-primary underline">support@manavly.com</a>.</p>
        </div>
      </div>
    </SiteLayout>
  );
}
