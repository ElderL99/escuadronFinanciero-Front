import { Outlet } from "react-router";
import useAuth from "../hooks/useAuth";

export default function MainLayout() {
  const auth = useAuth();

  if (auth.loading) return <p>Cargando...</p>;

  return (
    <main>
      <Outlet />
    </main>
  );
}
