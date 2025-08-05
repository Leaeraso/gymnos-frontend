import { CurrentUser } from "./user.type";

export type LoginCredentials = {
    username: string;
    password: string;
};

export type AuthAdminResponse = {
    token: string;
    user: CurrentUser;
};