import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContact extends Document {
    name: string;
    email: string;
    message: string;
    read: boolean;
    createdAt: Date;
}

const ContactSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

// Prevent model recompilation error in development
const Contact: Model<IContact> =
    mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;
