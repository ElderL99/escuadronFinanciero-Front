import { Suspense, lazy } from "react";
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

// 📊 Speed Insights
import { SpeedInsights } from "@vercel/speed-insights/react";

// 🧩 Páginas principales (Lazy Loading)
const HomePage = lazy(() => import("./pages/homePage/page.jsx"));
const MainLayout = lazy(() => import("./layout/mainLayout"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const LoginPage = lazy(() => import("./pages/Login/page"));
const RegisterPage = lazy(() => import("./pages/RegisterPage/page.jsx"));
const PasswordLostPage = lazy(() =>
  import("./pages/PasswordLostPage/page.jsx")
);

// 🧭 Layouts y rutas protegidas
import UserPrivateRoute from "./router/UserPrivateRouter";
import AdminPrivateRoute from "./router/AdminPrivateRouter";
const UserLayout = lazy(() => import("./layout/UserLayout.jsx"));
const AdminLayout = lazy(() => import("./layout/AdminLayout.jsx"));

// 👤 Páginas de usuario
const UserDashboard = lazy(() => import("./pages/User/UserDashboard"));
const UserProfile = lazy(() => import("./pages/User/UserPerfil.jsx"));
const UserApplicationsPage = lazy(() =>
  import("./pages/User/UserApplicationsPage.jsx")
);
const UserApplicationDetailPage = lazy(() =>
  import("./pages/User/UserApplicationsDetaliPage.jsx")
);
const UpdateApplicationPage = lazy(() =>
  import("./pages/User/UpdateApplicationsPage.jsx")
);
const SignaturePad = lazy(() =>
  import("./components/usedashboard/SignatureComponents/SignaturePad.jsx")
);
const UserCreateApplicationPage = lazy(() =>
  import("./pages/User/UserCreateApplicationPage")
);

// 🛠️ Páginas de administrador
const AdminDashboardPage = lazy(() =>
  import("./pages/admin/AdminDashboardPage.jsx")
);
const ApplictionDetailPage = lazy(() =>
  import("./pages/admin/ApplicationsUser/ApplicationDetailPage.jsx")
);
const AdminSignedContractsPage = lazy(() =>
  import("./pages/admin/ApplicationsActivation/AdminSignedContractsPage.jsx")
);
const AdminContractDetailPage = lazy(() =>
  import("./pages/admin/ApplicationsActivation/AdminContractDetailPage.jsx")
);
const AdminActiveCreditsPage = lazy(() =>
  import("./pages/admin/ActiveCredits/ActiveCreaditsPage.jsx")
);
const AdminCreditDetailPage = lazy(() =>
  import("./pages/admin/ActiveCredits/AdminCreditDetailPage.jsx")
);
const ResetPasswordPage = lazy(() =>
  import("./pages/ResetPasswordPage/page.jsx")
);
const UserCreditsPage = lazy(() => import("./pages/User/creditos/page"));
const UserCreditDetailPage = lazy(() =>
  import("./pages/User/creditos/[id]/page")
);
const VerifyEmailPage = lazy(() => import("./pages/verifyEmailPage/page.jsx"));
const ContactPage = lazy(() => import("./pages/contact/page"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy/page"));
const TermsConditions = lazy(() => import("./pages/TermsConditions/page"));
const AdminUsersPage = lazy(() =>
  import("./pages/admin/Users/AdminUsersPage.jsx")
);
const AdminUserDetailPage = lazy(() =>
  import("./pages/admin/Users/AdminUserDetailPage.jsx")
);

// Componente de carga
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

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
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-conditions" element={<TermsConditions />} />
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
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="users/:id" element={<AdminUserDetailPage />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <>
    <Suspense fallback={<LoadingFallback />}>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      />
    </Suspense>

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
    <SpeedInsights />
  </>
);
