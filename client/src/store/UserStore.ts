import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';
import type { UserStoreProps } from '../global';
axios.defaults.withCredentials = true;
const baseUrl = import.meta.env.MODE === 'development'
    ? 'http://localhost:2340'
    : 'https://doctor-appointment-hsbv.onrender.com';
const useUserStore = create<UserStoreProps>((set, get) => ({
    userAppointments: [],
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
                return response.status;
            } else if (response.status === 203) {
                set({ user: null, isVerified: false });
                toast.success(`Check your email ${email}!`);
                return response.status;
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
                set({ user: null, isVerified: false, userAppointments: [] });
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
    getUserAppointments: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get(`${baseUrl}/user-appointments`);
            set({ userAppointments: response.data.userAppointments });
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
    cancelAppointment: async (appointmentId: string) => {
        try {
            const response = await axios.post(`${baseUrl}/user-cancel-appointment`, {
                appointmentId
            });
            if (response.status === 200) {
                const currentAppointments = get().userAppointments;
                const updatedAppointments = currentAppointments.map(appointment =>
                    appointment._id === appointmentId
                        ? { ...appointment, status: 'cancelled' }
                        : appointment
                );
                set({ userAppointments: updatedAppointments });
                toast.success(`Appointment cancelled successfully`);
            }
        } catch (error) {
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
        }
    },
    createAppointment: async (doctorId: string, date: string, fees: number) => {
        try {
            const response = await axios.post(`${baseUrl}/user-create-appointment`, {
                doctorId,
                date,
                fees
            });
            if (response.status) {
                toast.success(`Appointment created sucessfully`);
            }
        } catch (error) {
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
        }
    },
    sendEmailReturnPassword: async (email: string) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(`${baseUrl}/api/user-auth/forget-password`, {
                email
            });
            if (response.status == 200) {
                toast.success(`Check code on your email: ${email}`);
            }
        } catch (error) {
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
    checkCode: async (code: string) => {
        set({ isLoading: true });
        try {
            await axios.post(`${baseUrl}/api/user-auth/get-code-reset-password`, {
                code
            });
        } catch (error) {
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
    resetPassword: async (code: string, password: string) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(`${baseUrl}/api/user-auth/reset-password`, {
                token: code,
                password
            });
            if (response.status == 200) {
                toast.success(`Your password has been changed sucessfully`);
                set({ user: response.data.user });
            }
        } catch (error) {
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
    }
}));
export default useUserStore;