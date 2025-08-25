"use client";

import { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import config from '@/config';
import { CurrentUser } from '@/types/user.type';

export const useCurrentUser = () => {
    const [user, setUser] = useState<CurrentUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const token = Cookie.get(config.ACCESS_TOKEN_COOKIE_KEY);

        if (token) {
            const userData = localStorage.getItem('gymnos_user');
            if (userData) {
                try {
                    const parsedUser = JSON.parse(userData);
                    setUser(parsedUser);
                } catch (error) {
                    console.error('Error parsing user data:', error);
                }
            }
        }

        setLoading(false);
    }, []);

    return { user, loading };
}; 