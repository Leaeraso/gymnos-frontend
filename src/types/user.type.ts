export interface CurrentUser {
    _id: string;
    username: string;
    role: {
        _id: string;
        name: string;
    };
};