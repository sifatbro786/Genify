import mongoose from "mongoose";

const querySchema = new mongoose.Schema(
    {
        template: {
            type: Object,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        query: {
            type: String,
            required: true,
        },
        content: {
            type: String,
        },
    },
    { timestamps: true },
);

const Query = mongoose.models?.Query || mongoose.model("Query", querySchema);
export default Query;
