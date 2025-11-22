import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';
import type { DoctorStoreProps } from '../global';
axios.defaults.withCredentials = true;
const baseUrl = import.meta.env.MODE === 'development'
    ? 'http://localhost:2340'
    : 'https://doctor-appointment-hsbv.onrender.com';
const useDoctorStore = create<DoctorStoreProps>((set, get) => ({
    isDoctorVerified: false,
    isCheckingDoctorVerify: true,
    isLoading: false,
    doctor: null,
    patients: 0,
    appointments: 0,
    doctorAppointments: [],
    doctorAppointmentsLimited: [],
    updateAppointmentStatus: (appointmentId: string, newStatus: string) => {
        set((state) => ({
            doctorAppointments: state.doctorAppointments.map(apt =>
                apt._id === appointmentId ? { ...apt, status: newStatus } : apt
            ),
            doctorAppointmentsLimited: state.doctorAppointmentsLimited.map(apt =>
                apt._id === appointmentId ? { ...apt, status: newStatus } : apt
            )
        }));
    },
    checkDoctorAuth: async () => {
        set({ isCheckingDoctorVerify: true });
        try {
            const response = await axios.get(`${baseUrl}/api/doctor-auth/check-doctor-auth`);
            set({ doctor: response.data.doctor, isDoctorVerified: true });
        } catch (error) {
            set({ doctor: null, isDoctorVerified: false });
        } finally {
            set({ isCheckingDoctorVerify: false });
        }
    },
    getDoctorAppointments: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get(`${baseUrl}/doctor-appointment`);
            if (response.status === 200) {
                set({ doctorAppointments: response.data.doctorAppointments });
            }
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        } finally {
            set({ isLoading: false });
        }
    },
    getDoctorAppointmentsLimited: async () => {
        try {
            const response = await axios.get(`${baseUrl}/latest-doctor-appointment`);
            if (response.status === 200) {
                set({ doctorAppointmentsLimited: response.data.doctorAppointmentsLimited });
            }
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        }
    },
    loginDoctor: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(`${baseUrl}/api/doctor-auth/login-doctor`, {
                email,
                password
            });
            if (response.status == 200) {
                toast.success(`You login sucessfully`);
                set({ doctor: response.data.doctor, isDoctorVerified: true });
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
    updateDoctor: async (name: string, speciality: string, degree: string, address: string, image: string, experience: string, fees: number, about: string, available: boolean) => {
        set({ isLoading: true });
        try {
            const response = await axios.put(`${baseUrl}/api/doctor-auth/update-doctor`, {
                name,
                speciality,
                degree,
                address,
                image,
                experience,
                fees,
                about,
                available
            });
            if (response.status === 200) {
                set({ doctor: response.data.doctor });
                toast.success(`Doctor data updated successfully`)
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
    logoutDoctor: async () => {
        try {
            await axios.post(`${baseUrl}/api/doctor-auth/logout-doctor`);
            set({ doctor: null, isDoctorVerified: false });
            toast.success(`Doctor logout sucessfully`)
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
    doctorAcceptAppointment: async (appointmentId: string) => {
        try {
            const response = await axios.post(`${baseUrl}/doctor-accept-appointment`, {
                appointmentId
            });
            if (response.status === 200) {
                toast.success(`Appointment accepted sucessfully`);
                get().updateAppointmentStatus(appointmentId, 'completed');
                if (get().patients != 0)
                    set({ patients: (get().patients || 1) - 1 });
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
    doctorCancelAppointment: async (appointmentId: string) => {
        try {
            const response = await axios.post(`${baseUrl}/doctor-cancel-appointment`, {
                appointmentId
            });
            if (response.status === 200) {
                toast.success(`Appointment cancelled sucessfully`);
                get().updateAppointmentStatus(appointmentId, 'cancelled');
                if (get().patients != 0)
                    set({ patients: (get().patients || 1) - 1 });
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
    getNumberOfAppointments: async () => {
        try {
            const response = await axios.get(`${baseUrl}/total-appointment-doctor`);
            set({ appointments: response.data.totalAppointmentsForDoctor });
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        }
    },
    getNumberOfPatients: async () => {
        try {
            const response = await axios.get(`${baseUrl}/total-patient-doctor`);
            set({ patients: response.data.totalPatientsForDoctor });
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        }
    }
}));
export default useDoctorStore;