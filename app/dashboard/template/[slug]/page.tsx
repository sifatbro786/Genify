"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import templates from "@/utils/template";
import Image from "next/image";
import { useState } from "react";

export interface Template {
    name: string;
    slug: string;
    icon: string;
    desc: string;
    category: string;
    aiPrompt: string;
    form: Form[];
}

export interface Form {
    label: string;
    field: string;
    name: string;
    required: boolean;
}

export default function TemplateDetailsPage({ params }: { params: { slug: string } }) {
    const [query, setQuery] = useState("");

    const template = templates.find((template) => template.slug === params.slug) as Template;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(query);
    };

    return (
        <>
            <div className="flex justify-between mx-5 my-3">
                <Link href="/dashboard">
                    <Button>
                        <ArrowLeft /> <span className="ml-2">Back</span>
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5">
                <div className="col-span-1 bg-slate-100 dark:bg-slate-900 rounded-md border p-5">
                    <div className="flex flex-col gap-3">
                        <Image src={template.icon} alt={template.name} width={50} height={50} />
                        <h2 className="font-medium text-lg">{template.name}</h2>
                        <p className="text-gray-500">{template.desc}</p>
                    </div>

                    <form className="mt-6" onSubmit={handleSubmit}>
                        {template.form.map((item, idx) => (
                            <div key={idx} className="my-2 flex flex-col gap-2 mb-7">
                                <label htmlFor={item.name} className="font-bold pb-5">
                                    {item.label}
                                </label>
                                {item.field === "input" ? (
                                    <Input
                                        id={item.name}
                                        name={item.name}
                                        placeholder={item.label}
                                        onChange={(e) => setQuery(e.target.value)}
                                        required={item.required}
                                    />
                                ) : (
                                    <Textarea
                                        id={item.name}
                                        name={item.name}
                                        placeholder={item.label}
                                        onChange={(e) => setQuery(e.target.value)}
                                        required={item.required}
                                    />
                                )}
                                <Button type="submit" className="w-full py-6">
                                    Generate Content
                                </Button>
                            </div>
                        ))}
                    </form>
                </div>

                <div className="col-span-2"></div>
            </div>
        </>
    );
}
