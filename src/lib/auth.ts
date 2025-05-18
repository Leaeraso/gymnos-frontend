import { cookies } from 'next/headers';

export const setAuthToken = async (token: string) => {
    (await cookies()).set('authToken', token, {
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
        httpOnly: false,
        sameSite: 'lax',
    });
};

export const removeAuthToken = async () => {
    (await cookies()).delete('authToken');
};

export const verifyAuthToken = async (): Promise<boolean> => {
    const token = (await (cookies())).get('authToken')?.value;
    if (!token) return false;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = payload.exp * 1000 < Date.now();
    return !isExpired;
};