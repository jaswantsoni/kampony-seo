import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Free GST Invoice Generator — Create GST Invoice Online | Kampony",
  description: "Create GST-compliant invoices online for free. Auto CGST, SGST and IGST calculation, HSN/SAC support, PDF download. Built for Indian MSMEs.",
  alternates: { canonical: "https://www.kampony.com/gst-invoice-generator-free" },
  keywords: ["free GST invoice generator", "GST invoice online", "create GST invoice", "GST bill generator India"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Load Google Identity Services in <head> so window.google is ready before download is attempted */}
      <Script src="https://accounts.google.com/gsi/client" strategy="beforeInteractive" />
      {children}
    </>
  );
}
