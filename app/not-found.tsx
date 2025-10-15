import { HomeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NotFound() {
    return (
        <main className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 text-center px-6">
            <div className="flex flex-col items-center max-w-md">
                {/* Icon / Illustration */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-cyan-400 blur-2xl opacity-30 animate-pulse rounded-full" />
                    <h1 className="relative text-[7rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-400 select-none">
                        404
                    </h1>
                </div>

                {/* Title + Description */}
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
                    Oops! Page not found
                </h2>
                <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">
                    The page you&apos;re looking for might have been removed or is temporarily
                    unavailable.
                </p>

                {/* Action */}
                <Link
                    href="/"
                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-2.5 text-white font-medium shadow-md hover:shadow-lg transition-all"
                >
                    <HomeIcon />
                    Back to Home
                </Link>
            </div>
        </main>
    );
}
