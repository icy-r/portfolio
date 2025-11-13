import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { isAllowedEmail, isEmailVerified } from "@/lib/auth-simple";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email) {
          return null;
        }

        const email = credentials.email.toLowerCase().trim();

        // Check if email is in admin whitelist
        if (!isAllowedEmail(email)) {
          return null;
        }

        // Check if email was verified via magic link (within last 5 minutes)
        if (isEmailVerified(email)) {
          return {
            id: email,
            name: "Admin",
            email: email,
          };
        }

        // Also check cookie as fallback
        const cookieHeader = (req as any)?.headers?.cookie || "";
        const cookies = cookieHeader.split(";").reduce((acc: Record<string, string>, cookie: string) => {
          const [key, value] = cookie.trim().split("=");
          if (key && value) acc[key] = decodeURIComponent(value);
          return acc;
        }, {});
        
        if (cookies["admin-email"] === email) {
          return {
            id: email,
            name: "Admin",
            email: email,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-in-production",
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// Export auth function for use in API routes
import { getServerSession } from "next-auth/next";

export const auth = async () => {
  return await getServerSession(authOptions);
};

