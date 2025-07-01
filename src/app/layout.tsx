import type { Metadata } from "next";
import "../style/globals.css";
import { geistSans, geistMono, inter } from "@/style/fonts";
import { ClerkProvider, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import Providers from "./Providers";

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
        <ClerkProvider>
          <SignedOut>
            <div className="w-screen h-screen flex justify-center items-center bg-[#292929]">
              <SignIn />
            </div>
          </SignedOut>
          <SignedIn>
            <Providers>
              {children}
            </Providers>
          </SignedIn>
        </ClerkProvider>
      </body>
    </html>
  );
}
