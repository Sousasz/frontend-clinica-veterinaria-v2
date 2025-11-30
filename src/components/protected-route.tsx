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
    setIsClient(true);
    if (isClient && (!user || user.role !== requiredRole)) {
      router.push("/");
    }
  }, [user, requiredRole, router, isClient]);

  if (!isClient || !user) {
    return <div>Carregando...</div>;
  }

  if (user.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
