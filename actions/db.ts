"use server";

import Query from "@/models/query";
import dbConnect from "@/utils/db";

export async function saveQuery(template: object, email: string, query: string, content: string) {
    try {
        await dbConnect();

        const newQuery = new Query({ template, email, query, content });
        await newQuery.save();

        console.log("✅ Query saved to DB");
        return { ok: true };
    } catch (error) {
        console.error("❌ DB Save Error:", error);
        return { ok: false };
    }
}
