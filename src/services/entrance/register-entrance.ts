import apiClient from "../api/api-client";

export const registerEntrance = async (dni: number) => {
  return apiClient('/register-entrance', {
    method: 'POST',
    body: JSON.stringify({ dni })
  });
};
