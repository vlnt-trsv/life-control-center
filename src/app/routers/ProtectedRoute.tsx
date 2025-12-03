import { useAuthStore } from "@/entities/auth/model/store";
import { Item } from "@/shared/ui/item";
import { Spinner } from "@/shared/ui/spinner";
import { Label } from "@radix-ui/react-label";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { session, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Item variant="outline">
          <Spinner className="size-6" />
          <Label>Загрузка...</Label>
        </Item>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};
