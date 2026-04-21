import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — Kampony",
  description: "Kampony's Privacy Policy explains how we collect, use, and protect your personal data when you use our GST billing platform.",
  alternates: { canonical: "https://www.kampony.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <SiteLayout>
      <div className="container max-w-3xl py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm mb-8">Last updated: April 2025</p>
        <div className="prose prose-gray max-w-none">
          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly, including account details (name, email, phone), business information (organisation name, GSTIN, address), invoice and transaction data, and payment information (processed securely via Razorpay — we do not store card details).</p>
          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>To provide and improve the Service</li>
            <li>To process payments and manage subscriptions</li>
            <li>To send transactional emails (invoices, receipts, reminders)</li>
            <li>To comply with legal obligations under Indian law (GST, IT Act)</li>
          </ul>
          <h2>3. Data Storage & Security</h2>
          <p>Your data is stored on secure cloud servers. We use industry-standard encryption (TLS/HTTPS) for data in transit and at rest.</p>
          <h2>4. Data Sharing</h2>
          <p>We do not sell your personal data. We may share data with payment processors (Razorpay), government authorities if required by law, and service providers who assist in operating the platform (under strict confidentiality).</p>
          <h2>5. Cookies</h2>
          <p>We use essential cookies for authentication and session management. We do not use third-party advertising cookies.</p>
          <h2>6. Your Rights</h2>
          <p>You have the right to access and download your data, correct inaccurate information, and request deletion of your account and data. Contact us at <a href="mailto:support@manavly.com" className="text-primary underline">support@manavly.com</a>.</p>
          <h2>7. Data Retention</h2>
          <p>We retain your data for as long as your account is active or as required by law. Invoice data may be retained for up to 7 years for GST compliance purposes.</p>
          <h2>8. Changes to This Policy</h2>
          <p>We may update this Privacy Policy periodically. We will notify you of significant changes via email or in-app notice.</p>
          <h2>9. Contact</h2>
          <p>For privacy-related queries, contact us at <a href="mailto:support@manavly.com" className="text-primary underline">support@manavly.com</a> or write to Manavly Technologies, India.</p>
        </div>
      </div>
    </SiteLayout>
  );
}
