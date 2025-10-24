"use client";

import { usageCount } from "@/actions/ai";
import { checkUserSubscription } from "@/actions/stripe";
import { UsageContextType } from "@/utils/types";
import { useUser } from "@clerk/nextjs";
import { createContext, useContext, useEffect, useState } from "react";

const UsageContext = createContext<UsageContextType | null>(null);

export const UsageProvider = ({ children }: { children: React.ReactNode }) => {
    //? state
    const [count, setCount] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [subscribed, setSubscribed] = useState(false);

    //? hook
    const { user } = useUser();
    const email = user?.primaryEmailAddress?.emailAddress || "";

    //? effects
    useEffect(() => {
        if (email) {
            fetchUsage();
            fetchSubscription();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email]);

    useEffect(() => {
        if (!subscribed && count > Number(process.env.NEXT_PUBLIC_FREE_TIER_USAGE)) {
            setOpenModal(true);
        } else {
            setOpenModal(false);
        }
    }, [count, subscribed]);

    //? handler functions
    const fetchUsage = async () => {
        const res = await usageCount(email);
        setCount(res);
    };

    const fetchSubscription = async () => {
        const response = await checkUserSubscription();
        setSubscribed(response?.ok || false);
    };

    return (
        <UsageContext.Provider value={{ count, fetchUsage, openModal, setOpenModal, subscribed }}>
            {children}
        </UsageContext.Provider>
    );
};

export const useUsage = () => {
    const context = useContext(UsageContext);
    if (context === null) {
        throw new Error("useUsage must be used within a UsageProvider");
    }
    return context;
};
