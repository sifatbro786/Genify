"use client";

import { LayoutDashboard, FileClock, WalletCards, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Usage from "./usage";
import SignUpModal from "../modal/sign-up-modal";

const menu = [
    {
        name: "Dashboard",
        icon: <LayoutDashboard />,
        path: "/dashboard",
    },
    {
        name: "History",
        icon: <FileClock />,
        path: "/dashboard/history",
    },
    {
        name: "Billing",
        icon: <WalletCards />,
        path: "/dashboard/billing",
    },
    {
        name: "Settings",
        icon: <Settings />,
        path: "/dashboard/settings",
    },
];

export default function SideNav() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full">
            <ul className="flex-1 space-y-2">
                {menu.map((item, idx) => (
                    <li
                        key={idx}
                        className={`${
                            pathname === item.path
                                ? "border-primary text-primary"
                                : "hover:border-primary hover:text-primary"
                        } flex md:m-2 mr-2 p-2 rounded-lg cursor-pointer border`}
                    >
                        <Link
                            href={item.path}
                            className="flex justify-center items-center md:justify-start w-full"
                        >
                            <div className="flex items-center">
                                {item.icon} <span className="ml-2 md:inline">{item.name}</span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="pb-20 mt-auto">
                <Usage />
                <SignUpModal />
            </div>
        </div>
    );
}
