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
