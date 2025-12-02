"use client";

import { useAuth } from "../contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "admin" | "user";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole = "user",
}) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // mark client after mount to avoid SSR mismatch
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    // if no user, redirect to home
    if (!user) {
      router.push("/");
      return;
    }

    if (user.role !== requiredRole) {
      // if user is admin but trying to access a user-only page, send to admin dashboard
      if (user.role === "admin" && requiredRole === "user") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
  }, [isClient, user, requiredRole, router]);

  if (!isClient || !user) {
    return <div>Carregando...</div>;
  }

  if (user.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
