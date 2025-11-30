import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlog extends Document {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    date: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        excerpt: { type: String, required: true },
        content: { type: String, required: true },
        date: { type: String, required: true },
        tags: { type: [String], default: [] },
    },
    { timestamps: true }
);

const Blog: Model<IBlog> =
    mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
