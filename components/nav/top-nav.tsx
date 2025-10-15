"use client";

import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
    useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";

export default function TopNav() {
    const { isSignedIn, user } = useUser();
    console.log({ isSignedIn, user });

    return (
        <nav className="flex justify-between items-center py-2 px-4 shadow">
            <Link href="/" className="text-2xl font-bold">
                Genify
            </Link>

            <div className="flex gap-2 items-center">
                {isSignedIn && (
                    <Link href="/dashboard" className="cursor-pointer font-semibold">
                        {user?.firstName + "'s"} Dashboard
                    </Link>
                )}
                <SignedOut>
                    <SignInButton />
                    <SignUpButton>
                        <Button>Sign Up</Button>
                    </SignUpButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    );
}
