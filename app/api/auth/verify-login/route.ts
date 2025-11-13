import { NextRequest, NextResponse } from "next/server";
import { verifyLoginToken, getAdminEmail } from "@/lib/auth-simple";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const adminEmail = getAdminEmail();

  if (!token) {
    return NextResponse.redirect(
      new URL("/admin/login?error=Invalid link", request.url)
    );
  }

  // Verify token (email param is optional, we'll use admin email from env)
  const verifiedEmail = verifyLoginToken(token);

  if (!verifiedEmail) {
    console.error("Token verification failed", { 
      token, 
      email, 
      adminEmail,
      pendingLoginsSize: "check server logs"
    });
    return NextResponse.redirect(
      new URL("/admin/login?error=Link expired or invalid", request.url)
    );
  }

  // Ensure verified email matches admin email (both should be normalized)
  if (verifiedEmail.toLowerCase().trim() !== adminEmail.toLowerCase().trim()) {
    console.error("Email mismatch", { verifiedEmail, adminEmail });
    return NextResponse.redirect(
      new URL("/admin/login?error=Invalid email", request.url)
    );
  }

  // Set a secure cookie for the session (this will be checked by NextAuth)
  const response = NextResponse.redirect(
    new URL("/admin/login?verified=true&email=" + encodeURIComponent(verifiedEmail), request.url)
  );

  response.cookies.set("admin-email", verifiedEmail, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return response;
}

