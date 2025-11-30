import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import PinnedRepo from "@/models/PinnedRepo";

export async function GET() {
    try {
        await dbConnect();
        const repos = await PinnedRepo.find({}).sort({ order: 1 });
        return NextResponse.json(repos);
    } catch (error) {
        console.error("Error fetching pinned repos:", error);
        return NextResponse.json(
            { error: "Failed to fetch pinned repos" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const repos = await req.json();

        if (!Array.isArray(repos)) {
            return NextResponse.json(
                { error: "Invalid data format" },
                { status: 400 }
            );
        }

        await dbConnect();

        // Clear existing pinned repos and insert new ones
        // This is a simple strategy: replace all. 
        // For more complex scenarios, we might want to update/upsert.
        await PinnedRepo.deleteMany({});

        // Add order index if not present, though frontend should send it
        const reposWithOrder = repos.map((repo, index) => ({
            ...repo,
            repoId: repo.id, // Map GitHub 'id' to 'repoId'
            order: index,
        }));

        await PinnedRepo.insertMany(reposWithOrder);

        return NextResponse.json(
            { message: "Pinned repositories updated successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating pinned repos:", error);
        return NextResponse.json(
            { error: "Failed to update pinned repos" },
            { status: 500 }
        );
    }
}
