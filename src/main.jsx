import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";

import AuthProvider from "./context/AuthContext.jsx";

// 🧩 Páginas principales
import HomePage from "./pages/homePage/page.jsx";
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
import UserDashboard from "./pages/User/UserDashboard";
import UserProfile from "./pages/User/UserPerfil.jsx";
import UserApplicationsPage from "./pages/User/UserApplicationsPage.jsx";
import UserApplicationDetailPage from "./pages/User/UserApplicationsDetaliPage.jsx";
import UpdateApplicationPage from "./pages/User/UpdateApplicationsPage.jsx";
import SignaturePad from "./components/usedashboard/SignatureComponents/SignaturePad.jsx";
import UserCreateApplicationPage from "./pages/User/UserCreateApplicationPage";

// 🛠️ Páginas de administrador
import AdminDashboardPage from "./pages/admin/AdminDashboardPage.jsx";
import ApplictionDetailPage from "./pages/admin/ApplicationsUser/ApplicationDetailPage.jsx";
import AdminSignedContractsPage from "./pages/admin/ApplicationsActivation/AdminSignedContractsPage.jsx";
import AdminContractDetailPage from "./pages/admin/ApplicationsActivation/AdminContractDetailPage.jsx";
import AdminActiveCreditsPage from "./pages/admin/ActiveCredits/ActiveCreaditsPage.jsx";
import AdminCreditDetailPage from "./pages/admin/ActiveCredits/AdminCreditDetailPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import UserCreditsPage from "./pages/User/creditos/page";
import UserCreditDetailPage from "./pages/User/creditos/[id]/page";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ContactPage from "./pages/contact/page";

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
      <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
      <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
      <Route path="/contacto" element={<ContactPage />} />
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
        <Route
          path="create-solicitud"
          element={<UserCreateApplicationPage />}
        />
        <Route path="solicitudes" element={<UserApplicationsPage />} />
        <Route path="solicitud/:id" element={<UserApplicationDetailPage />} />
        <Route
          path="solicitud/:id/editar"
          element={<UpdateApplicationPage />}
        />
        <Route path="solicitud/:id/firma" element={<SignaturePad />} />
        <Route path="creditos" element={<UserCreditsPage />} />
        <Route path="creditos/:id" element={<UserCreditDetailPage />} />
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

createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    />

    <Toaster
      position="top-right"
      toastOptions={{
        duration: 1500,
        style: {
          background: "#1a1a1a",
          color: "#fff",
          borderRadius: "8px",
        },
      }}
    />
  </>
);
