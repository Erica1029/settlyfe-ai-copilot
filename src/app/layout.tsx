import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Settlyfe AI Copilot",
  description: "A mobile-first AI rental decision assistant demo.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
