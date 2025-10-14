"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function mainAI(text: string) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: text,
    });
    return response.text;
}
