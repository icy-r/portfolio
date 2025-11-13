"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Don't check auth for login page
    if (pathname === "/admin/login") {
      return;
    }

    // Redirect to login if not authenticated
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [session, status, pathname, router]);

  // Show loading state while checking auth
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  // Allow login page to render without auth
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Protect other admin routes
  if (status === "unauthenticated") {
    return null; // Will redirect via useEffect
  }

  return <>{children}</>;
}

