import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Outlet />
    </main>
  );
}
