import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import TopNav from "@/components/nav/top-nav";
import { ThemeProvider } from "@/context/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import dbConnect from "@/utils/db";
import { UsageProvider } from "@/context/usage";

const inter = Inter({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Genify",
    description: "It's an AI-powered Software SaaS application for content generation.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    await dbConnect();

    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body className={`${inter.className} antialiased`}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <UsageProvider>
                            <header>
                                <TopNav />
                            </header>
                            <main>{children}</main>
                        </UsageProvider>
                        <Toaster richColors />
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
