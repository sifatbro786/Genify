"use client";

import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";

export default function TopNav() {
    const { isSignedIn, user } = useUser();

    return (
        <nav className="flex justify-between items-center py-3 px-4 border-b">
            <Link href="/" className="text-2xl font-bold">
                Genify
            </Link>

            <div className="flex gap-3 items-center">
                {isSignedIn && (
                    <Link href="/dashboard" className="cursor-pointer font-semibold">
                        {user?.firstName + "'s"} Dashboard
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
