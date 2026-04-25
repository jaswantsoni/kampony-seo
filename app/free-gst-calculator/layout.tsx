import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free GST Calculator India — CGST, SGST & IGST | Kampony",
  description: "Free online GST calculator for India. Instantly calculate CGST, SGST and IGST for intra-state and inter-state transactions. No signup required.",
  alternates: { canonical: "https://www.kampony.com/free-gst-calculator" },
  keywords: ["GST calculator", "free GST calculator India", "CGST SGST IGST calculator", "online GST calculator"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
