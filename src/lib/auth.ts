import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

export const setAuthToken = (token: string, req?: NextApiRequest, res?: NextApiResponse) => {
    setCookie('authToken', token, {
        req,
        res,
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
        httpOnly: false,
        sameSite: 'lax',
    });
};

export const removeAuthToken = (req?: NextApiRequest, res?: NextApiResponse) => {
    deleteCookie('authToken', { req, res, path: '/' });
};

export const verifyAuthToken = async (req?: NextApiRequest): Promise<boolean> => {
    const token = await getCookie('authToken', { req });
    if (!token) return false;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = payload.exp * 1000 < Date.now();

    return !isExpired;
};