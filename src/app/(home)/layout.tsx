import type { Metadata } from "next";

import { geistSans, geistMono, inter } from "@/style/fonts";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";


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
                <SidebarProvider>
                    {/* <AppSidebar /> */}
                    
                        <SidebarTrigger />
                        {children}
                    
                </SidebarProvider>
            </body>
        </html>
    );
}
