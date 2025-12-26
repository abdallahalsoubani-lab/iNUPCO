import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NUPCO - المركز الوطني للتوريد الطبي",
  description: "مساعد ذكي لموقع NUPCO",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
