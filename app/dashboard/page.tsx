"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function Dashboard() {
  const { isSignedIn } = useUser(); // Get user info
  const router = useRouter(); // Router for redirection

  useEffect(() => {
    if (isSignedIn) {
      router.push("/"); // Redirect to homepage
    }
  }, [isSignedIn, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p>Redirecting...</p>
    </div>
  );
}
