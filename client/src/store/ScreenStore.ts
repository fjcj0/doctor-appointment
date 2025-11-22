import { create } from 'zustand';
import type { ScreenStoreProps } from '../global';
import axios from 'axios';
import toast from 'react-hot-toast';
axios.defaults.withCredentials = true;
const baseUrl = import.meta.env.MODE === 'development'
    ? 'http://localhost:2340'
    : 'https://doctor-appointment-c217.onrender.com';
const useScreenStore = create<ScreenStoreProps>((set) => ({
    doctor: null,
    relatedDoctors: [],
    limitedDoctorsScreen: [],
    isDoctorLimitingLoading: false,
    doctorsScreen: [],
    getDoctor: async (id: string) => {
        try {
            const response = await axios.get(`${baseUrl}/doctor/${id}`);
            set({ doctor: response.data.doctor });
        } catch (error: unknown) {
            throw new Error(error instanceof Error ? error.message : String(error));
        }
    },
    getRelatedDoctors: async (speciality: string, name: string) => {
        try {
            const response = await axios.get(`${baseUrl}/related-doctor/${speciality}/${name}`);
            set({ relatedDoctors: response.data.doctors });
        } catch (error: unknown) {
            throw new Error(error instanceof Error ? error.message : String(error));
        }
    },
    getLimitedDoctorsScreen: async () => {
        set({ isDoctorLimitingLoading: true });
        try {
            const response = await axios.get(`${baseUrl}/doctors-limiting`);
            set({ limitedDoctorsScreen: response.data.doctors });
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : String(error));
            throw new Error(error instanceof Error ? error.message : String(error));
        } finally {
            set({ isDoctorLimitingLoading: false });
        }
    },
    getDoctorsScreen: async () => {
        try {
            const response = await axios.get(`${baseUrl}/doctors`);
            set({ doctorsScreen: response.data.doctors });
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : String(error));
            throw new Error(error instanceof Error ? error.message : String(error));
        }
    },
}));
export default useScreenStore;