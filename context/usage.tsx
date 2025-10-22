"use client";

import { usageCount } from "@/actions/ai";
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
        if (email) fetchUsage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email]);

    useEffect(() => {
        if (count > 10000) setOpenModal(true);
    }, [count]);

    const fetchUsage = async () => {
        const res = await usageCount(email);
        setCount(res);
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
