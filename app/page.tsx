"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Markdown from "react-markdown";
import { mainAI } from "../actions/ai";

export default function HomePage() {
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            const data = await mainAI(query);
            setResponse(data ?? "");
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="m-5">
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Ask anything"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="mb-5"
                />
                <Button type="submit" disabled={loading}>
                    Generate with AI
                </Button>
            </form>

            <Card className="mt-5">
                <CardHeader>AI Response will appear here...</CardHeader>
                <CardContent>
                    {loading ? <p>Loading...</p> : <Markdown>{response}</Markdown>}
                </CardContent>
            </Card>
        </div>
    );
}
