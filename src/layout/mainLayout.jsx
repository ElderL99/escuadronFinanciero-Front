import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Outlet />
    </main>
  );
}
