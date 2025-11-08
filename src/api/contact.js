import api from "./axios";

export const sendContactForm = async (data) => {
  return await api.post("/contact", data);
};
