"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/auth/auth.service';
import { toast } from "sonner";
import { setAuthToken } from '@/lib/auth';

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const login = async (credentials: { username: string; password: string }) => {
        setIsLoading(true);
        try {
            const { token, user } = await AuthService.loginAdmin(credentials);
            setAuthToken(token);
            router.push('/dashboard');
            toast.success(`Bienvenido, ${user.username}`);
        } catch (error) {
            toast.error('Error al iniciar sesión');
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading };
};