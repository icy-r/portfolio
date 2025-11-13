import { NextRequest, NextResponse } from "next/server";
import { getAdminEmail, generateLoginToken } from "@/lib/auth-simple";
import { sendMagicLinkEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const adminEmail = getAdminEmail();
    
    // Generate login token
    const token = generateLoginToken(adminEmail);
    const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const loginUrl = `${baseUrl}/api/auth/verify-login?token=${token}&email=${encodeURIComponent(adminEmail)}`;

    // Try to send email, but don't fail if email service is not configured
    const emailSent = await sendMagicLinkEmail(adminEmail, loginUrl);

    if (!emailSent && process.env.EMAIL_SERVER_USER) {
      // Email service is configured but failed
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

    // For development/testing: return the link if email service is not configured
    if (!process.env.EMAIL_SERVER_USER) {
      return NextResponse.json({
        message: "Email service not configured. Use this link to login:",
        loginUrl, // Only return in development
        note: "In production, configure EMAIL_SERVER_* environment variables",
      });
    }

    return NextResponse.json({
      message: `Check ${adminEmail} for a login link.`,
    });
  } catch (error) {
    console.error("Login request error:", error);
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    );
  }
}

