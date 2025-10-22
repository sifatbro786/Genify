import mongoose from "mongoose";

let isConnected = false;

export default async function dbConnect() {
    if (isConnected) {
        console.log("🟢 Using existing MongoDB connection");
        return;
    }

    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI not found in environment");
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
        isConnected = db.connections[0].readyState === 1;
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        throw error;
    }
}
