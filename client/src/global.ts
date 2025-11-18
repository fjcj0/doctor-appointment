export type LoginStatusProp = 'doctor' | 'admin';
export type headerLinksProps = {
    text: string,
    direct: string
}
export interface cardUserProps {
    name: string;
    image: string;
    specail: string;
    address: string;
    date: string;
    isCancelled: boolean;
    index: number
}
export interface doctorInformationProps {
    name: string;
    specail: string;
    year_experince: string;
    about: string;
    image: string;
    fees: number;
    degree: string
}
export type linksProps = {
    text: string,
    icon: string,
    direct: string
}
export interface AppointmentTableProps {
    patient: string;
    image: string;
    payment: string;
    age: number;
    date: string;
    fee: string;
    status: string;
    doctor?: string,
    doctorImage?: string,
    onCancel: () => Promise<void>;
    onConfirm?: () => Promise<void>;
}
export type DoctorInformationType = {
    experience: string;
    name: string,
    profilePicture: string,
    speciality: string,
    about: string,
    fees: number,
    degree: string,
}
export type DoctorsScreenType = {
    speciality: string;
    _id: string;
    profilePicture: string,
    available: boolean,
    name: string,
}
export interface ScreenStoreProps {
    doctor: DoctorInformationType | null,
    getDoctor: (id: string) => Promise<void>,
    limitedDoctorsScreen: DoctorsScreenType[],
    doctorsScreen: DoctorsScreenType[],
    getLimitedDoctorsScreen: () => Promise<void>,
    getDoctorsScreen: () => Promise<void>,
    isDoctorLimitingLoading: boolean,
    relatedDoctors: DoctorsScreenType[],
    getRelatedDoctors: (speciality: string, name: string) => Promise<void>
}
export type UserType = {
    _id: string;
    name: string;
    email: string;
    profilePicture: string;
    isVerified: boolean;
    birthday: string | null;
    gender: 'male' | 'female';
    address: string | null;
    phone: string | null;
} | null;
export type doctorIdType = {
    address: string,
    name: string,
    profilePicture: string,
    speciality: string,
    _id: string,
}
export type userAppointment = {
    _id: string;
    doctorId: doctorIdType;
    fees: number,
    payment: string,
    status: string;
    date: string,
    isCancelled: boolean,
}
export interface UserStoreProps {
    userAppointments: userAppointment[],
    isVerified: boolean,
    isLoading: boolean,
    isCheckingVerify: boolean,
    user: UserType,
    checkAuth: () => Promise<void>,
    createAccount: (name: string, email: string, password: string, gender: string) => Promise<void>,
    login: (email: string, password: string) => Promise<number | void>,
    logout: () => Promise<void>,
    verifyEmail: (code: string) => Promise<void>,
    updateProfile: (
        name: string,
        profilePicture: string | null,
        birthday: string | null,
        gender: string | null,
        address: string | null,
        phone: string | null,
    ) => Promise<void>,
    getUserAppointments: () => Promise<void>,
    cancelAppointment: (appointmentId: string) => Promise<void>,
}