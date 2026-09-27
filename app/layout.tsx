import type { Metadata, Viewport } from "next";
import "@fontsource-variable/estedad/wght.css";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${site.name} — به‌زودی`,
  description: site.description,
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#070a12",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl" className="bg-background">
      <body className="antialiased">{children}</body>
    </html>
  );
}
