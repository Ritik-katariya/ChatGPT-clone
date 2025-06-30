import type { Metadata } from "next";
import "../style/globals.css";
import { geistSans, geistMono, inter } from "@/style/fonts";
import { ClerkProvider, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import { ReactQueryProvider } from "@/lib/ReactQueryProvider";

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
<ReactQueryProvider>

            {children}
</ReactQueryProvider>

          </SignedIn>
        </ClerkProvider>

      </body>
    </html>
  );
}
