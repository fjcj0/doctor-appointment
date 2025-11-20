import { useEffect } from "react";
import AppointmentTable from "../../components/ui/AppointmentTable";
import LoaderDashboard from "../../tools/LoaderDashboard";
import useDoctorStore from "../../store/DoctorStore";
import { calculateAge } from "../../utils/calculateAge";
const DoctorAppointmentsPage = () => {
    const { getDoctorAppointments, doctorAppointments, isLoading } = useDoctorStore();
    const handleData = async () => {
        try {
            await getDoctorAppointments();
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        }
    }
    useEffect(() => {
        handleData();
    }, []);
    if (isLoading) {
        return <LoaderDashboard />;
    }
    const onCancel = async () => {
        console.log('Cancelled');
    }
    const onConfirm = async () => {
        console.log('Confirmed');
    }
    return (
        <div className="p-6 font-nunito">
            <h1 className="text-xl font-bold text-gray-800 mb-6">Appointments</h1>
            <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                    <div className="grid grid-cols-7 gap-4 py-3 px-2 bg-gray-100 rounded-t-lg font-semibold text-gray-700 border-x-[0.5px] border-gray-300 border-t-[0.5px]">
                        <p>Patient</p>
                        <p>Payment</p>
                        <p className="text-center">Age</p>
                        <p className="text-center">Date & Time</p>
                        <p className="text-center">Fees</p>
                        <p className="text-center">Action</p>
                    </div>
                    <div className="bg-white rounded-b-lg shadow-sm border border-gray-200">
                        {doctorAppointments.map((appointment, index) => (
                            <AppointmentTable
                                key={index}
                                patient={appointment.userId.name}
                                image={appointment.userId.profilePicture}
                                payment={appointment.payment}
                                age={calculateAge(appointment.userId.birthday)}
                                fee={appointment.fees}
                                status={appointment.status}
                                date={appointment.date}
                                onCancel={onCancel}
                                onConfirm={onConfirm}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DoctorAppointmentsPage;