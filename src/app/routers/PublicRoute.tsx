import { useAuthStore } from "@/entities/auth/model/store";
import { Item } from "@/shared/ui/item";
import { Label } from "@/shared/ui/label";
import { Spinner } from "@/shared/ui/spinner";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
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

  if (session) {
    return <Navigate to="/main" replace />;
  }

  return <Outlet />;
};
