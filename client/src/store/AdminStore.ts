import { create } from 'zustand';
import axios from 'axios';
import type { AdminStoreProps } from '../global';
import toast from 'react-hot-toast';
axios.defaults.withCredentials = true;
const baseUrl = import.meta.env.NODE_ENV == 'production' ? '' : 'http://localhost:2340';
const useAdminStore = create<AdminStoreProps>((set, get) => ({
    isAdminVerified: false,
    isCheckingAdminVerify: true,
    isLoading: false,
    admin: null,
    patients: 0,
    doctors: 0,
    appointments: 0,
    adminAppointments: [],
    adminAppointmentsLimited: [],
    checkAdminAuth: async () => {
        set({ isCheckingAdminVerify: true });
        try {

        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        } finally {
            set({ isCheckingAdminVerify: false });
        }
    },
    getAdminAppointments: async () => {
        try {

        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        }
    },
    getAdminAppointmentsLimited: async () => {
        try {

        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        }
    },
    loginAdmin: async (email: string, password: string) => {
        set({ isLoading: true });
        try {

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
    updateAdmin: async (name: string, profilePicture: string) => {
        set({ isLoading: true });
        try {

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
    logoutAdmin: async () => {
        try {

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
    adminCancelAppointment: async (appointmentId: string) => {
        try {

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
    changeAvailable: async (doctorId: string) => {
        try {

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
    getTotalAppointments: async () => {
        try {

        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        }
    },
    getTotalDoctors: async () => {
        try {

        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        }
    },
    getTotalPatients: async () => {
        try {

        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        }
    },
    createDoctor: async (name: string, email: string, password: string, speciality: string, degree: string, address: string, profilePicture: string, experience: string, fees: number, about: string) => {
        set({ isLoading: true });
        try {

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
}));
export default useAdminStore;