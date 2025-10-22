import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./pages/HomePage";
import MainLayout from "./layout/mainLayout";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import UserPrivateRoute from "./router/UserPrivateRouter";
import UserDashboard from "./pages/UserDashboard";
import RegisterPage from "./pages/RegisterPage";
import PasswordLostPage from "./pages/PasswordLostPage";
import AdminLayout from "./layout/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage.jsx";
import ApplictionDetailPage from "./pages/admin/ApplicationsUser/ApplicationDetailPage.jsx";
import AdminSignedContractsPage from "./pages/admin/ApplicationsActivation/AdminSignedContractsPage.jsx";
import AdminContractDetailPage from "./pages/admin/ApplicationsActivation/AdminContractDetailPage.jsx";
import AdminActiveCreditsPage from "./pages/admin/ActiveCredits/ActiveCreaditsPage.jsx";
import AdminCreditDetailPage from "./pages/admin/ActiveCredits/AdminCreditDetailPage.jsx";
import UserLayout from "./layout/UserLayout.jsx";
import UserProfile from "./pages/User/UserPerfil.jsx";
import AdminPrivateRoute from "./router/AdminPrivateRouter.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/recover-password", element: <PasswordLostPage /> },
      { path: "*", element: <NotFoundPage /> }, // Ruta de error
    ],
  },
  {
    path: "/user",
    element: (
      <UserPrivateRoute>
        <UserLayout />
      </UserPrivateRoute>
    ),
    children: [
      { path: "dashboard", element: <h1>Aqui es el dashboard</h1> },
      { path: "solicitudes", element: <h1>Aqui es la lista de solictudes</h1> },
      {
        path: "solicitud/:id",
        element: <h1>Aqui es el detalle de la solicitud</h1>,
      },
      { path: "perfil", element: <UserProfile /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminPrivateRoute>
        <AdminLayout />
      </AdminPrivateRoute>
    ),
    children: [
      { path: "dashboard", element: <AdminDashboardPage /> },
      { path: "applications/:id", element: <ApplictionDetailPage /> },
      { path: "signed-contracts", element: <AdminSignedContractsPage /> },
      { path: "signed-contracts/:id", element: <AdminContractDetailPage /> },
      { path: "active-credits", element: <AdminActiveCreditsPage /> },
      { path: "active-credits/:creditId", element: <AdminCreditDetailPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider
    router={router}
    future={{
      v7_startTransition: true,
    }}
  />
);
