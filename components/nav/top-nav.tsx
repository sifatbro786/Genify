"use client";

import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";

export default function TopNav() {
    const { isSignedIn } = useUser();

    return (
        <nav className="flex justify-between items-center py-3 px-4 border-b">
            <Link href="/" className="text-2xl font-bold">
                Genify
            </Link>

            <Link href="/membership" className="hidden md:block">🔥 Join free or $9.99/month</Link>

            <div className="flex gap-3 items-center">
                {isSignedIn && (
                    <Link href="/dashboard" className="cursor-pointer font-semibold">
                        Dashboard
                    </Link>
                )}

                <SignedOut>
                    <SignInButton>
                        <Button>Sign In</Button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>

                <ThemeToggle />
            </div>
        </nav>
    );
}
