import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Contact from "@/models/Contact";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await dbConnect();

    const newContact = await Contact.create({
      name,
      email,
      message,
    });

    return NextResponse.json(
      { message: "Message sent successfully", contact: newContact },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const contacts = await Contact.find({}).sort({ createdAt: -1 });

    // Map MongoDB _id to id for frontend compatibility
    const formattedContacts = contacts.map(contact => ({
      id: contact._id.toString(),
      name: contact.name,
      email: contact.email,
      message: contact.message,
      read: contact.read || false,
      createdAt: contact.createdAt,
    }));

    return NextResponse.json(formattedContacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing contact ID" },
        { status: 400 }
      );
    }

    await dbConnect();
    await Contact.findByIdAndDelete(id);

    return NextResponse.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return NextResponse.json(
      { error: "Failed to delete contact" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { id, read } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Missing contact ID" },
        { status: 400 }
      );
    }

    await dbConnect();
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { read },
      { new: true }
    );

    return NextResponse.json(updatedContact);
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json(
      { error: "Failed to update contact" },
      { status: 500 }
    );
  }
}
