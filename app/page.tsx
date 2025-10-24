"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import SignInModal from "@/components/modal/sign-in-modal";
import Footer from "@/components/footer/footer";
import PromoCard from "@/components/card/promo-card";

export default function Homepage() {
    return (
        <>
            <div
                className="relative bg-cover bg-top"
                style={{ backgroundImage: 'url("/background.png")', height: "50vh" }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#010818] z-0"></div>

                <div className="relative z-10 flex items-center justify-center h-full">
                    <div className="text-center">
                        <SignInModal />

                        <h1 className="text-white text-4xl md:text-7xl font-bold uppercase bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
                            AI Content Generator
                        </h1>
                        <p className="text-sm md:text-base text-white mb-5">
                            Generate AI content for your blog, website, or social media with a
                            single click and more
                        </p>
                        <Link href="/gen-ai">
                            <Button variant="outline" className="border border-gray-500">Get started</Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="py-10 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        <PromoCard
                            title="Template Library"
                            description="Choose from a wide range of templates for your needs"
                            link="/dashboard"
                        />

                        <PromoCard
                            title="SEO Optimized Content"
                            description="Get SEO optimized content for your blog or website"
                            link="/dashboard"
                        />

                        <PromoCard
                            title="Social Media Posts"
                            description="Generate content for your social media posts"
                            link="/dashboard"
                        />

                        <PromoCard
                            title="AI Content Generator"
                            description="Generate AI content for your blog, website & social media"
                            link="/dashboard"
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
