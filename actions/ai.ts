"use server";

import Query from "@/models/query";
import dbConnect from "@/utils/db";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function mainAI(text: string) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: text,
    });
    return response.text;
}

export async function saveQuery(template: object, email: string, query: string, content: string) {
    try {
        await dbConnect();

        const newQuery = new Query({
            template,
            email,
            query,
            content,
        });

        await newQuery.save();
        return {
            ok: true,
        };
    } catch (err) {
        console.log(err);
        return {
            ok: false,
        };
    }
}

export async function getQueries(email: string, page: number, pageSize: number) {
    try {
        await dbConnect();

        const skip = (page - 1) * pageSize;
        const totalQueries = await Query.countDocuments({ email });

        const queries = await Query.find({ email })
            .skip(skip)
            .limit(pageSize)
            .sort({ createdAt: -1 })
            .lean();

        return {
            queries: JSON.parse(JSON.stringify(queries)),
            totalPages: Math.ceil(totalQueries / pageSize),
        };
    } catch (err) {
        console.log(err);
        return {
            ok: false,
        };
    }
}

export async function usageCount(email: string) {
    await dbConnect();

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const result = await Query.aggregate([
        {
            $match: {
                email: email,
                $expr: {
                    $and: [
                        { $eq: [{ $year: "$createdAt" }, currentYear] },
                        { $eq: [{ $month: "$createdAt" }, currentMonth] },
                    ],
                },
            },
        },
        {
            $project: {
                wordCount: {
                    $size: {
                        $split: [{ $trim: { input: "$content" } }, " "],
                    },
                },
            },
        },
        {
            $group: {
                _id: null,
                totalWords: { $sum: "$wordCount" },
            },
        },
    ]);

    return result.length > 0 ? result[0].totalWords : 0;
}
