import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./pages/HomePage";
import MainLayout from "./layout/mainLayout";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import UserPrivateRoute from "./router/UserPrivateRouter";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import RegisterPage from "./pages/RegisterPage";
import PasswordLostPage from "./pages/PasswordLostPage";
import SolicitudDetail from "./components/DashBoard/SolicitudDetail";
import AdminLayout from "./layout/AdminLayout";
import ContractSignedList from "./components/DashBoard/Contract/ContractsList";
import ConctractDetail from "./pages/admin/ContractDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/recover-password", element: <PasswordLostPage /> },
      {
        path: "/user/dashboard",
        element: (
          <UserPrivateRoute>
            <UserDashboard /> {/* solo usuarios autenticados */}
          </UserPrivateRoute>
        ),
      },
      { path: "*", element: <NotFoundPage /> }, // Ruta de error
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "applications/:id", element: <SolicitudDetail /> },
      { path: "contracts", element: <ContractSignedList /> },
      { path: "contracts/:contractId", element: <ConctractDetail /> },
    ],
  },
]);

// ✅ Render sin fragment innecesario
createRoot(document.getElementById("root")).render(
  <RouterProvider
    router={router}
    future={{
      v7_startTransition: true,
    }}
  />
);
