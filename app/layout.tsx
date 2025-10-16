import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import TopNav from "@/components/nav/top-nav";
import { ThemeProvider } from "@/context/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Genify",
    description: "It's an AI-powered Software SaaS application for content generation.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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
                        <header>
                            <TopNav />
                        </header>
                        <main>{children}</main>
                        <Toaster richColors />
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
