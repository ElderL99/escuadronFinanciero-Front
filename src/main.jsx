import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import "./index.css";

import { AuthProvider } from "./context/AuthContext.jsx";

// 🧩 Páginas principales
import HomePage from "./pages/HomePage";
import MainLayout from "./layout/mainLayout";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PasswordLostPage from "./pages/PasswordLostPage";

// 🧭 Layouts y rutas protegidas
import UserPrivateRoute from "./router/UserPrivateRouter";
import AdminPrivateRoute from "./router/AdminPrivateRouter";
import UserLayout from "./layout/UserLayout.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";

// 👤 Páginas de usuario
import UserDashboard from "./pages/UserDashboard";
import UserProfile from "./pages/User/UserPerfil.jsx";

// 🛠️ Páginas de administrador
import AdminDashboardPage from "./pages/admin/AdminDashboardPage.jsx";
import ApplictionDetailPage from "./pages/admin/ApplicationsUser/ApplicationDetailPage.jsx";
import AdminSignedContractsPage from "./pages/admin/ApplicationsActivation/AdminSignedContractsPage.jsx";
import AdminContractDetailPage from "./pages/admin/ApplicationsActivation/AdminContractDetailPage.jsx";
import AdminActiveCreditsPage from "./pages/admin/ActiveCredits/ActiveCreaditsPage.jsx";
import AdminCreditDetailPage from "./pages/admin/ActiveCredits/AdminCreditDetailPage.jsx";

// ===============================
// 📍 Definición de rutas con contexto
// ===============================
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={
        <AuthProvider>
          <MainLayout />
        </AuthProvider>
      }
    >
      {/* 🏠 Público */}
      <Route index element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/recover-password" element={<PasswordLostPage />} />
      <Route path="*" element={<NotFoundPage />} />

      {/* 👤 Usuario */}
      <Route
        path="/user"
        element={
          <UserPrivateRoute>
            <UserLayout />
          </UserPrivateRoute>
        }
      >
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="perfil" element={<UserProfile />} />
        <Route path="solicitudes" element={<h1>Lista de solicitudes</h1>} />
        <Route path="solicitud/:id" element={<h1>Detalle de solicitud</h1>} />
      </Route>

      {/* 🛠️ Admin */}
      <Route
        path="/admin"
        element={
          <AdminPrivateRoute>
            <AdminLayout />
          </AdminPrivateRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="applications/:id" element={<ApplictionDetailPage />} />
        <Route path="signed-contracts" element={<AdminSignedContractsPage />} />
        <Route
          path="signed-contracts/:id"
          element={<AdminContractDetailPage />}
        />
        <Route path="active-credits" element={<AdminActiveCreditsPage />} />
        <Route
          path="active-credits/:creditId"
          element={<AdminCreditDetailPage />}
        />
      </Route>
    </Route>
  )
);

// ===============================
// 🚀 Render principal
// ===============================
createRoot(document.getElementById("root")).render(
  <RouterProvider
    router={router}
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
  />
);
