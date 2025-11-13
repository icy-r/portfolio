"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import { Send } from "lucide-react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginUrl, setLoginUrl] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();

  useEffect(() => {
    // Check for error in URL
    const urlError = searchParams.get("error");
    if (urlError) {
      setError(urlError);
    }

    // Check if magic link was verified
    const verified = searchParams.get("verified");
    const verifiedEmail = searchParams.get("email");
    
    if (verified === "true" && verifiedEmail) {
      // Automatically sign in with NextAuth
      signIn("credentials", {
        email: verifiedEmail,
        redirect: false,
      }).then((result) => {
        if (result?.ok) {
          router.push("/admin");
          router.refresh();
        } else {
          setError("Failed to sign in. Please try again.");
        }
      });
    }

    // If already authenticated, redirect
    if (status === "authenticated") {
      router.push("/admin");
    }
  }, [searchParams, status, router]);

  const handleRequestLogin = async () => {
    setError("");
    setSuccess("");
    setLoginUrl("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/request-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to send login link");
      } else {
        setSuccess(data.message || "Check your email for a login link");
        
        // If email service is not configured, show the link directly (dev mode)
        if (data.loginUrl) {
          setLoginUrl(data.loginUrl);
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLinkClick = async () => {
    // When user clicks the magic link, verify and sign in
    if (loginUrl) {
      window.location.href = loginUrl;
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-[#111111]/80 backdrop-blur-sm border border-gray-800 rounded-xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-gray-400">Access the admin dashboard</p>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-400 mb-6">
                Click the button below to receive a magic link to access the admin dashboard.
              </p>
            </div>

            {error && (
              <div className="px-4 py-3 bg-red-900/20 border border-red-800/50 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="px-4 py-3 bg-green-900/20 border border-green-800/50 rounded-lg">
                <p className="text-green-400 text-sm">{success}</p>
              </div>
            )}

            {loginUrl && (
              <div className="px-4 py-3 bg-blue-900/20 border border-blue-800/50 rounded-lg">
                <p className="text-blue-400 text-sm mb-2">
                  Email service not configured. Click below to login:
                </p>
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleMagicLinkClick}
                  className="w-full"
                >
                  <Send size={18} className="mr-2" />
                  Use Magic Link
                </Button>
              </div>
            )}

            <Button
              type="button"
              onClick={handleRequestLogin}
              variant="primary"
              className="w-full"
              disabled={isLoading || !!success}
            >
              <Send size={18} className="mr-2" />
              {isLoading ? "Sending..." : success ? "Check Your Email" : "Send Magic Link"}
            </Button>
          </div>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
            >
              ← Back to Portfolio
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

