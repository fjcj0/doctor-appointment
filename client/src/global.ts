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
    year_experince: number;
    about: string;
    image: string;
    fee: string;
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