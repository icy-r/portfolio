// Simple email-based authentication without email service
// This is a fallback if you don't want to set up email service

import crypto from "crypto";

// Admin email (single email from env)
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "asath12882@gmail.com").toLowerCase().trim();

// Secret for signing tokens (use NEXTAUTH_SECRET or generate one)
const TOKEN_SECRET = process.env.NEXTAUTH_SECRET || process.env.TOKEN_SECRET || "change-this-secret-in-production";

// Store verified emails temporarily (for NextAuth authorize)
// Note: This is in-memory, so it won't persist across serverless function invocations
// In production, use Redis or database
const verifiedEmails = new Map<string, number>();

// Generate a signed token for email verification
export function generateLoginToken(email: string): string {
  // Normalize email
  const normalizedEmail = email.toLowerCase().trim();
  const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes
  
  // Create payload
  const payload = {
    email: normalizedEmail,
    expiresAt: expiresAt,
  };
  
  // Encode payload
  const payloadStr = JSON.stringify(payload);
  const payloadBase64 = Buffer.from(payloadStr).toString("base64url");
  
  // Create signature
  const signature = crypto
    .createHmac("sha256", TOKEN_SECRET)
    .update(payloadBase64)
    .digest("base64url");
  
  // Return token: payload.signature
  return `${payloadBase64}.${signature}`;
}

// Verify login token
export function verifyLoginToken(token: string): string | null {
  try {
    const [payloadBase64, signature] = token.split(".");
    
    if (!payloadBase64 || !signature) {
      console.log("Invalid token format");
      return null;
    }
    
    // Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", TOKEN_SECRET)
      .update(payloadBase64)
      .digest("base64url");
    
    if (signature !== expectedSignature) {
      console.log("Invalid token signature");
      return null;
    }
    
    // Decode payload
    const payloadStr = Buffer.from(payloadBase64, "base64url").toString("utf-8");
    const payload = JSON.parse(payloadStr);
    
    // Check expiration
    if (Date.now() > payload.expiresAt) {
      console.log("Token expired");
      return null;
    }
    
    // Check if email matches admin email
    const loginEmail = payload.email.toLowerCase().trim();
    if (loginEmail !== ADMIN_EMAIL) {
      console.log(`Email mismatch: ${loginEmail} !== ${ADMIN_EMAIL}`);
      return null;
    }
    
    // Mark email as verified (valid for 5 minutes)
    verifiedEmails.set(loginEmail, Date.now() + 5 * 60 * 1000);
    
    return loginEmail;
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
}

// Check if email was recently verified via magic link
export function isEmailVerified(email: string): boolean {
  const verifiedAt = verifiedEmails.get(email);
  if (!verifiedAt) return false;

  if (Date.now() > verifiedAt) {
    verifiedEmails.delete(email);
    return false;
  }

  return true;
}

// Get admin email
export function getAdminEmail(): string {
  return ADMIN_EMAIL;
}

// Check if email is allowed (matches admin email)
export function isAllowedEmail(email: string): boolean {
  return email.toLowerCase().trim() === ADMIN_EMAIL;
}

