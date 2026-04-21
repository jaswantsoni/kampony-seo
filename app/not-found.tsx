import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";

export default function NotFound() {
  return (
    <SiteLayout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="mt-4 text-xl text-muted-foreground">Page not found</p>
        <Link href="/" className="mt-8 text-primary underline hover:opacity-80">← Back to home</Link>
      </div>
    </SiteLayout>
  );
}
