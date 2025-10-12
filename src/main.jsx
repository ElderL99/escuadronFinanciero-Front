import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./pages/HomePage";
import MainLayout from "./layout/mainLayout";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import UserPrivateRoute from "./router/UserPrivateRouter";
import UserDashboard from "./pages/UserDashboard";
import AdminPrivateRoutes from "./router/AdminPrivateRouter";
import AdminDashboard from "./pages/AdminDashboard";
import RegisterPage from "./pages/RegisterPage";
import PasswordLostPage from "./pages/PasswordLostPage";

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
      {
        path: "/admin/dashboard",
        element: (
          <AdminPrivateRoutes>
            <AdminDashboard /> {/* Solo admin */}
          </AdminPrivateRoutes>
        ),
      },
      { path: "*", element: <NotFoundPage /> }, // Ruta de error
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
