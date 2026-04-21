import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://www.kampony.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kampony — GST Billing & Business Management Software for Indian MSMEs",
    template: "%s | Kampony",
  },
  description: "Create GST-compliant invoices, manage inventory, track payments and run your business from anywhere. Free plan available. Trusted by Indian MSMEs.",
  keywords: ["GST billing software", "invoice software India", "MSME billing", "e-way bill", "GST invoice", "inventory management"],
  authors: [{ name: "Kampony" }],
  openGraph: {
    siteName: "Kampony",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
