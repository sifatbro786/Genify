type LoaderProps = {
    size?: "sm" | "md" | "lg" | "xl";
    message?: string;
    className?: string;
    center?: boolean;
};

const SIZE_MAP: Record<NonNullable<LoaderProps["size"]>, string> = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
};

// A clean, accessible, and modern loader component for AI SaaS apps.
// Uses Tailwind classes only (no external CSS required). Export default.
export default function Loader({
    size = "md",
    message = "Generating content...",
    className = "",
    center = true,
}: LoaderProps) {
    const dims = SIZE_MAP[size];

    return (
        <div
            className={`${
                center
                    ? "flex flex-col items-center justify-center gap-3"
                    : "inline-flex items-center gap-3"
            } ${className}`}
            role="status"
            aria-live="polite"
            aria-label={message}
        >
            {/* Spinner: layered SVG with soft gradient and subtle motion */}
            <div className={`relative ${dims}`} style={{ minWidth: 24 }}>
                <svg
                    viewBox="0 0 44 44"
                    fill="none"
                    className={`absolute inset-0 ${dims}`}
                    aria-hidden
                >
                    <defs>
                        <linearGradient id="g1" x1="0" x2="1">
                            <stop offset="0%" stopColor="#7c3aed" stopOpacity="1" />
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
                        </linearGradient>
                    </defs>
                    <circle cx="22" cy="22" r="20" stroke="#e6e9ee" strokeWidth="4" />
                    <path
                        d="M22 2a20 20 0 0 1 0 40"
                        stroke="url(#g1)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        style={{
                            transformOrigin: "center",
                            animation: "spin 1.2s linear infinite",
                        }}
                    />
                </svg>

                {/* Orbiting dot for a bit of personality */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ width: "100%", height: "100%" }}
                    aria-hidden
                >
                    <div
                        style={{
                            transformOrigin: "22px 22px",
                            animation: "orbit 1.6s linear infinite",
                        }}
                    >
                        <div className="translate-x-[20px] translate-y-0">
                            <div
                                className="rounded-full bg-gradient-to-br from-indigo-600 to-cyan-400 shadow-[0_6px_18px_rgba(6,182,212,0.18)]"
                                style={{ width: 6, height: 6 }}
                            />
                        </div>
                    </div>
                </div>

                {/* Inline keyframes (keeps this component self-contained) */}
                <style>{`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg);} }
          @keyframes orbit { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
        `}</style>
            </div>

            {/* Message / accessible text */}
            <div className="text-center">
                <p className="text-sm font-medium tracking-wide text-slate-700 dark:text-slate-200">
                    {message}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    This might take a few seconds — thanks for your patience.
                </p>
            </div>
        </div>
    );
}
