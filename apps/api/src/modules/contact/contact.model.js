import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
            default: "",
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            default: "",
        },
        role: {
            type: String,
            enum: ["Tenant", "Owner", "Agent", "Inspector", "Other"],
            default: "Tenant",
        },
        linkedProperties: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Property",
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Contact", contactSchema);
