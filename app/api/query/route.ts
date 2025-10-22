import { NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import Query from "@/models/query";

export async function POST(req: Request) {
    try {
        const { template, email, query, content } = await req.json();

        await dbConnect();

        const newQuery = new Query({ template, email, query, content });
        await newQuery.save();

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("Error saving query:", error);
        return NextResponse.json({
            ok: false,
            error: error instanceof Error ? error.message : error,
        });
    }
}
