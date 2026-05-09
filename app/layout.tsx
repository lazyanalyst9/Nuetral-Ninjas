import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AFTERLIFE_2126",
  description: "A recovered archive from the future internet.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
