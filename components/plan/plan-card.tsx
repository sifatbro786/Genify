"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";
import { createCheckoutSession } from "@/actions/stripe";

export default function PlanCard({ name, image }: { name: string; image: string }) {
    // state
    const [loading, setLoading] = useState(false);

    // hook
    const { isSignedIn, isLoaded } = useUser();
    const router = useRouter();

    const handleCheckout = async () => {
        if (name == "Free") {
            router.push("/dashboard");
            return;
        } else {
            setLoading(true);

            try {
                const response = await createCheckoutSession();
                const { url, error } = response;
                if (error) {
                    toast.error(error);
                    return;
                }
                if (url) {
                    window.location.href = url;
                }
            } catch (err: any) {
                console.log(err);
                toast.error("An unexpected error occurred. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 border">
            <Image width={100} height={100} className="m-5" src={image} alt="monthly membership" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{name} Membership</div>
                <p className="text-gray-700 dark:text-gray-300 text-base">
                    Enjoy{" "}
                    {name == "Free"
                        ? "Limited AI generated content forever for just $0.00/month"
                        : "Unlimited AI generated content forever for just $9.99/month"}
                </p>
                <ul className="m-5">
                    <li>✨ {name == "Free" ? "Limited" : "Unlimited"} word generation</li>
                    <li>🧠 Advanced AI features</li>
                    <li>⚡ Faster processing times</li>
                    <li>🛠️ {name == "Free" ? "" : "Priority"} customer support</li>
                </ul>
            </div>

            {loading ? (
                <div className="px-5 pb-10">
                    <Button disabled={loading}>
                        <Loader2Icon className="animate-spin mr-2" /> Processing
                    </Button>
                </div>
            ) : !isLoaded ? (
                ""
            ) : !isSignedIn ? (
                <div className="px-5 pb-10">
                    <Button>
                        <SignInButton />
                    </Button>
                </div>
            ) : (
                <div className="px-5 pb-10">
                    <Button onClick={handleCheckout}>Get Started</Button>
                </div>
            )}
        </div>
    );
}
