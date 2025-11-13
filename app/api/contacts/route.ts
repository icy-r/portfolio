import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import {
  getContacts,
  createContact,
  getContact,
  markContactAsRead,
  deleteContact,
} from "@/lib/data";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (id) {
    const contact = getContact(id);
    if (!contact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }
    return NextResponse.json(contact);
  }

  const contacts = getContacts();
  return NextResponse.json(contacts);
}

export async function POST(request: NextRequest) {
  // Public endpoint for submitting contact forms
  try {
    const body = await request.json();
    const contact = createContact({
      name: body.name,
      email: body.email,
      message: body.message,
    });
    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, read } = body;
    
    if (read !== undefined) {
      const success = markContactAsRead(id);
      if (!success) {
        return NextResponse.json({ error: "Contact not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  const deleted = deleteContact(id);
  if (!deleted) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}

