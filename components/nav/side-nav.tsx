"use client";

import { LayoutDashboard, FileClock, WalletCards, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
        <div className="h-screen p-5 shadow-sm border-r border-b">
            {menu.map((item, idx) => (
                <div
                    key={idx}
                    className={`${
                        pathname === item.path
                            ? "bg-primary text-white dark:text-black"
                            : "hover:bg-primary hover:text-white hover:dark:text-black"
                    } flex md:m-2 mr-2 p-2 rounded-lg cursor-pointer`}
                >
                    <ul className="flex justify-center items-center md:justify-start w-full">
                        <li>
                            <Link href={item.path} className="flex items-center">
                                {item.icon}{" "}
                                <span className="ml-2 hidden md:inline">{item.name}</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            ))}
        </div>
    );
}
