import api from "./axios";

export const getAdminDashboard = async () => {
  return api.get("/admin/applications/overview");
};

// 📩 Solicitudes enviadas
export const getAdminApplicationsSubmitted = async () => {
  return api.get("/admin/applications/submitted");
};

export const getApplicationById = async (applicationId) => {
  return api.get(`/admin/applications/${applicationId}`);
};

// ✅ Aprobar solicitud
export const approveUsersApplicationsById = async (applicationId) => {
  return api.patch(`/admin/applications/${applicationId}/approve`);
};

// ❌ Rechazar solicitud
export const rejectUserApplication = async (applicationId) => {
  return api.patch(`/admin/applications/${applicationId}/reject`);
};

// 💳 Activar crédito
export const activeUserCredit = async (applicationId) => {
  return api.patch(`/admin/applications/${applicationId}/active-credit`);
};

/* Documentos */

export const getDocumentsByApplicationId = async (applicationId) => {
  return api.get(`admin/applications/${applicationId}/documents`);
};
