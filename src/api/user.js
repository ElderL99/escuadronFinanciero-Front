import api from "./axios";

// Obtener todas las solicitudes del usuario autenticado
export const getUserApplications = async () => api.get("/user/solicitud");

// Obtener una solicitud específica
export const getUserApplicationById = async (id) =>
  api.get(`/user/solicitud/${id}`);

// Enviar una solcitud Especifica

export const sendUserApplications = async (applicationId) =>
  api.patch(`/user/solicitud/${applicationId}/send`);

// Actualizar solicitud (solo draft)
export const updateUserApplication = async (id, data) =>
  api.patch(`/user/solicitud/${id}`, data);

// 🟦 Eliminar solicitud (solo draft o rejected)
export const deleteUserApplication = async (id) =>
  api.delete(`/user/solicitud/${id}`);

// Obtener documentos asociados
export const getUserApplicationDocuments = async (id) =>
  api.get(`/user/solicitud/${id}/documentos`);

// Actualizar documentos
export const updateUserApplicationDocuments = (id, formData) => {
  return api.patch(`user/solicitud/${id}/documentos`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Obtener contrato generado by solicitud Id
export const getUserContractBySolicitudId = async (id) =>
  api.get(`/user/solicitud/${id}/contrato`);

// crear nueva solicitud
export const createUserApplication = async (formData) =>
  api.post("/user/solicitud", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// 🔹 Obtener resumen de créditos del usuario
export const getUserCreditsOverview = async () => {
  return await axios.get("/user/credits/overview");
};

// 🔹 Subir comprobante de pago (ticket)
export const uploadUserPaymentTicket = async (
  creditId,
  paymentNumber,
  file
) => {
  const formData = new FormData();
  formData.append("comprobantePago", file);

  return await axios.post(
    `/user/creditos/${creditId}/pagos/${paymentNumber}/upload`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
