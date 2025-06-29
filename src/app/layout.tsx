import type { Metadata } from "next";
import "../style/globals.css";
import { geistSans, geistMono, inter } from "@/style/fonts";


export const metadata: Metadata = {
  title: "ChatGPT Clone",
  description: "A clone of ChatGPT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
