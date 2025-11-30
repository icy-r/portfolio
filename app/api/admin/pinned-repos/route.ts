import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "pinned-repos.json");

async function getPinnedRepos() {
    try {
        const data = await fs.readFile(DATA_FILE, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function savePinnedRepos(repos: number[]) {
    await fs.writeFile(DATA_FILE, JSON.stringify(repos, null, 2));
}

export async function GET() {
    const repos = await getPinnedRepos();
    return NextResponse.json(repos);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        if (!Array.isArray(body)) {
            return NextResponse.json(
                { error: "Invalid data format. Expected an array of IDs." },
                { status: 400 }
            );
        }
        await savePinnedRepos(body);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update pinned repos" },
            { status: 500 }
        );
    }
}
