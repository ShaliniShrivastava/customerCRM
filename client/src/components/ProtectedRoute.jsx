"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children, role }) {
  const router = useRouter();

  const user = useSelector((state) => state.auth.user);
  const authLoading = useSelector((state) => state.auth.authLoading);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (role && user.role !== role) {
      router.replace("/");
    }
  }, [user, role, authLoading, router]);

  if (authLoading || !user || (role && user.role !== role)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-yellow-400">
        Loading...
      </div>
    );
  }

  return children;
}