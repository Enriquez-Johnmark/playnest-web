import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PlayNest | Play. Learn. Grow.",
  description: "A thoughtful PlayNest program preview for families.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
