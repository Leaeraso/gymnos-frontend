export type LoginCredentials = {
    username: string;
    password: string;
};

export type AuthAdminResponse = {
    token: string;
    user: {
        _id: string;
        username: string;
        role: {
            _id: string;
            name: string;
        }
    };
};