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
            const response = await axios.get(`${baseUrl}/api/admin-auth/check-admin-auth`);
            set({ isAdminVerified: true, admin: response.data.admin });
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        } finally {
            set({ isCheckingAdminVerify: false });
        }
    },
    getAdminAppointments: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get(`${baseUrl}/admin-appointment`);
            set({ adminAppointments: response.data.allAppointments });
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        } finally {
            set({ isLoading: false });
        }
    },
    getAdminAppointmentsLimited: async () => {
        try {
            const response = await axios.get(`${baseUrl}/admin-latest-appointment`);
            set({ adminAppointmentsLimited: response.data.appointmentsLimited });
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        }
    },
    loginAdmin: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(`${baseUrl}/api/admin-auth/login-admin`, {
                email,
                password
            });
            set({ isAdminVerified: true, admin: response.data.admin });
            toast.success(`Welcome ${response.data.admin.name}`);
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
    updateAdmin: async (name: string, image: string) => {
        set({ isLoading: true });
        try {
            const response = await axios.put(`${baseUrl}/api/admin-auth/update-admin`, {
                name,
                image
            });
            if (response.status === 200) {
                toast.success(`Admin updated sucessfully`);
                set({ admin: response.data.admin });
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
    logoutAdmin: async () => {
        try {
            await axios.post(`${baseUrl}/api/admin-auth/logout-admin`);
            set({ isAdminVerified: false, admin: null });
            toast.success(`You logged out successfully`);
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
            const response = await axios.post(`${baseUrl}/admin-cancel-appointment`, {
                appointmentId
            });
            if (response.status === 200) {
                toast.success(`Appointment Cancelled Sucessfully`);
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
    changeAvailable: async (doctorId: string) => {
        try {
            const response = await axios.put(`${baseUrl}/admin-change-doctor-available`, {
                doctorId
            });
            if (response.status === 200) {
                toast.success(`Doctor available changed sucessfully`);
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
    getTotalAppointments: async () => {
        try {
            const response = await axios.get(`${baseUrl}/admin-total-appointment`);
            set({ appointments: response.data.totalAllAppointments });
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        }
    },
    getTotalDoctors: async () => {
        try {
            const response = await axios.get(`${baseUrl}/admin-total-doctor`);
            set({ doctors: response.data.totalDoctors });
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        }
    },
    getTotalPatients: async () => {
        try {
            const response = await axios.get(`${baseUrl}/admin-total-patient`);
            set({ patients: response.data.totalAllPatients });
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        }
    },
    createDoctor: async (name: string, email: string, password: string, speciality: string, degree: string, address: string, profilePicture: string, experience: string, fees: number, about: string) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(`${baseUrl}/api/doctor-auth/create-doctor-account`, {
                name,
                email,
                password,
                speciality,
                degree,
                address,
                profilePicture,
                experience,
                fees,
                about
            });
            if (response.status === 201) {
                toast.success(`Doctor created successfully`);
                set({ doctors: (get().doctors || 0) + 1 });
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
}));
export default useAdminStore;