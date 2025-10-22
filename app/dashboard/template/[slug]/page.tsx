"use client";

import { mainAI, saveQuery } from "@/actions/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUsage } from "@/context/usage";
import templates from "@/utils/template";
import { Template } from "@/utils/types";
import { useUser } from "@clerk/nextjs";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { ArrowLeft, Copy, Loader2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function TemplateDetailsPage({ params }: { params: { slug: string } }) {
    const [query, setQuery] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const editorRef = useRef<Editor | null>(null);

    // hooks
    const { fetchUsage } = useUsage();
    const { user } = useUser();
    const email = (user?.primaryEmailAddress?.emailAddress as string) || "";

    useEffect(() => {
        if (content) {
            const editorInstance = editorRef.current?.getInstance();
            editorInstance?.setMarkdown(content);
        }
    }, [content]);

    const template = templates.find((template) => template.slug === params.slug) as Template;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true);

            const data = await mainAI(template.aiPrompt + query);
            setContent(data ?? "");

            // Save to database
            await saveQuery(template, email, query, data ?? "");
            fetchUsage();
        } catch (error) {
            setContent(`An error occurred: ${error}. Please try again.`);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async () => {
        const editorInstance = editorRef.current?.getInstance();
        const content = editorInstance?.getMarkdown();

        try {
            await navigator.clipboard.writeText(content ?? "");
            toast.success("content copied to clipboard");
        } catch (error) {
            console.error(error);
            toast.error("Failed to copy to clipboard");
        }
    };

    return (
        <div>
            <div className="flex justify-between mx-5 my-3">
                <Link href="/dashboard">
                    <Button>
                        <ArrowLeft /> <span className="ml-2">Back</span>
                    </Button>
                </Link>

                <Button onClick={handleCopy}>
                    <Copy /> <span className="ml-2">Copy</span>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-5 md:gap-y-0 md:gap-x-5 px-5">
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
                                <Button type="submit" className="w-full py-6" disabled={loading}>
                                    {loading ? (
                                        <Loader2Icon className="animate-spin mr-2" />
                                    ) : (
                                        "Generate Contents"
                                    )}
                                </Button>
                            </div>
                        ))}
                    </form>
                </div>

                <div className="col-span-2">
                    <Editor
                        ref={editorRef}
                        initialValue="Generated content will appear here."
                        previewStyle="vertical"
                        height="600px"
                        initialEditType="wysiwyg"
                        useCommandShortcut={true}
                    />
                </div>
            </div>
        </div>
    );
}
