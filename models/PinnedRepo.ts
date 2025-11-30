import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPinnedRepo extends Document {
    repoId: number;
    name: string;
    description: string;
    url: string;
    stars: number;
    language: string;
    order: number;
}

const PinnedRepoSchema: Schema = new Schema({
    repoId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    url: { type: String, required: true },
    stars: { type: Number, default: 0 },
    language: { type: String },
    order: { type: Number, default: 0 },
});

const PinnedRepo: Model<IPinnedRepo> =
    mongoose.models.PinnedRepo ||
    mongoose.model<IPinnedRepo>("PinnedRepo", PinnedRepoSchema);

export default PinnedRepo;
