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
  return api.get(`/admin/applications/${applicationId}/documents`);
};

/* Contratos */

export const getAllContractsSigned = async () => {
  return api.get("/admin/contracts/overview");
};

export const getContractById = async (contractId) => {
  return api.get(`/admin/contracts/${contractId}`);
};

/* Creditos Activos */

export const getAllCreditsActive = async () => {
  return api.get("/admin/credits/overview");
};

// Activar un Credito
export const activeCreditById = async (applicationId) => {
  return api.patch(`/admin/credits/${applicationId}/active-credit`);
};

// 🧾 Obtener todos los pagos de un crédito
export const getAllPaymentsByCreditId = async (creditId) => {
  return api.get(`/admin/creditos/${creditId}/payments`);
};

// 📄 Obtener recibo individual de un pago
export const getPaymentReceipt = async (creditId, paymentNumber) => {
  return api.get(
    `/admin/creditos/${creditId}/payments/${paymentNumber}/receipt`
  );
};

// ✅ Aprobar un pago
export const approvePayment = async (creditId, paymentNumber) => {
  return api.patch(
    `/admin/creditos/${creditId}/payments/${paymentNumber}/approve`
  );
};

// ❌ Rechazar un pago
export const rejectPayment = async (creditId, paymentNumber, reason) => {
  return api.patch(
    `/admin/creditos/${creditId}/payments/${paymentNumber}/reject`,
    {
      reason,
    }
  );
};
