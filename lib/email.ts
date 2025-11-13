import nodemailer from "nodemailer";

// Create transporter for sending emails
export const emailTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

// Verify email configuration
export async function verifyEmailConfig() {
  try {
    await emailTransporter.verify();
    return true;
  } catch (error) {
    console.error("Email configuration error:", error);
    return false;
  }
}

// Send magic link email
export async function sendMagicLinkEmail(email: string, url: string) {
  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER,
    to: email,
    subject: "Sign in to Admin Dashboard",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .button { display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Sign in to Admin Dashboard</h2>
            <p>Click the button below to sign in to your admin dashboard:</p>
            <a href="${url}" class="button">Sign In</a>
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #666;">${url}</p>
            <p>This link will expire in 24 hours.</p>
            <div class="footer">
              <p>If you didn't request this email, please ignore it.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Sign in to Admin Dashboard\n\nClick this link to sign in: ${url}\n\nThis link will expire in 24 hours.`,
  };

  try {
    await emailTransporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

