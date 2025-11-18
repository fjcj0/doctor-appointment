import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';
import type { UserStoreProps } from '../global';
axios.defaults.withCredentials = true;
const baseUrl = import.meta.env.NODE_ENV == 'production' ? '' : 'http://localhost:2340';
const useUserStore = create<UserStoreProps>((set) => ({
    isVerified: false,
    isCheckingVerify: true,
    isLoading: false,
    user: null,
    checkAuth: async () => {
        set({ isCheckingVerify: true });
        try {
            const response = await axios.get(`${baseUrl}/api/user-auth/check-user-auth`);
            set({ user: response.data.user, isVerified: true });
        } catch (error: unknown) {
            set({
                isVerified: false,
                user: null
            });
        } finally {
            set({ isCheckingVerify: false });
        }
    },
    createAccount: async (name: string, email: string, password: string, gender: string) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(`${baseUrl}/api/user-auth/create-user-account`, {
                email,
                name,
                password,
                gender
            });
            if (response.status === 201) {
                toast.success(`Verify your account an email sent to ${email}`);
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.data?.error) {
                toast.error(error.response.data.error);
                throw new Error(error.response.data.error);
            } else if (error instanceof Error) {
                toast.error(error.message);
                throw error;
            } else {
                const errorMessage = 'An unknown error occurred';
                toast.error(errorMessage);
                throw new Error(errorMessage);
            }
        } finally {
            set({ isLoading: false });
        }
    },
    login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(`${baseUrl}/api/user-auth/login-user`, {
                email,
                password
            });
            if (response.status === 200) {
                set({ user: response.data.user, isVerified: true });
                toast.success(`Welcome back ${response.data.user.name}!`);
            } else if (response.status === 203) {
                toast.success(`Verify your account an email sent to ${email}`);
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.data?.error) {
                toast.error(error.response.data.error);
                throw new Error(error.response.data.error);
            } else if (error instanceof Error) {
                toast.error(error.message);
                throw error;
            } else {
                const errorMessage = 'An unknown error occurred';
                toast.error(errorMessage);
                throw new Error(errorMessage);
            }
        } finally {
            set({ isLoading: false });
        }
    },
    verifyEmail: async (code: string) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(`${baseUrl}/api/user-auth/verify-email`, {
                code
            });
            if (response.status == 200) {
                set({ user: response.data.user, isVerified: true });
                toast.success(`Welcome ${response.data.user.name}`)
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.data?.error) {
                toast.error(error.response.data.error);
                throw new Error(error.response.data.error);
            } else if (error instanceof Error) {
                toast.error(error.message);
                throw error;
            } else {
                const errorMessage = 'An unknown error occurred';
                toast.error(errorMessage);
                throw new Error(errorMessage);
            }
        } finally {
            set({ isLoading: false });
        }
    },
    logout: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.post(`${baseUrl}/api/user-auth/logout-user`);
            if (response.status == 200) {
                set({ user: null, isVerified: false });
                toast.success('Logged out successfully');
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.data?.error) {
                toast.error(error.response.data.error);
                throw new Error(error.response.data.error);
            } else if (error instanceof Error) {
                toast.error(error.message);
                throw error;
            } else {
                const errorMessage = 'An unknown error occurred';
                toast.error(errorMessage);
                throw new Error(errorMessage);
            }
        } finally {
            set({ isLoading: false });
        }
    },
    updateProfile: async (
        name: string,
        profilePicture: string | null,
        birthday: string | null,
        gender: string | null,
        address: string | null,
        phone: string | null
    ) => {
        set({ isLoading: true });
        try {
            const response = await axios.put(`${baseUrl}/api/user-auth/update-user`, {
                name,
                image: profilePicture,
                birthday,
                gender,
                address,
                phone
            });
            if (response.status === 200) {
                set({ user: response.data.user });
                toast.success('Profile updated successfully');
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.data?.error) {
                toast.error(error.response.data.error);
                throw new Error(error.response.data.error);
            } else if (error instanceof Error) {
                toast.error(error.message);
                throw error;
            } else {
                const errorMessage = 'An unknown error occurred';
                toast.error(errorMessage);
                throw new Error(errorMessage);
            }
        } finally {
            set({ isLoading: false });
        }
    },
}));
export default useUserStore;