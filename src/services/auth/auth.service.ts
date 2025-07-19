import apiClient from "../api/api-client";
import { AuthAdminResponse, LoginCredentials } from "../../types/auth.type";

export const AuthService = {
    loginAdmin: async (credentials: LoginCredentials): Promise<AuthAdminResponse> => {
        return apiClient<AuthAdminResponse>('/auth/admin/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    },
};