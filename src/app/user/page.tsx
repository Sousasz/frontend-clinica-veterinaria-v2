export const metadata = {
  title: "Usuário | Joyce Clínica Veterinária",
};

import Users from "./users";
import ProtectedRoute from "@/components/protected-route";

export default function Page() {
  return (
    <ProtectedRoute requiredRole="user">
      <Users />
    </ProtectedRoute>
  );
}
