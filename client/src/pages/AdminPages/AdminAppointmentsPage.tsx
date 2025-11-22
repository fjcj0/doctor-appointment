import { useEffect } from "react";
import LoaderDashboard from "../../tools/LoaderDashboard";
import AppointmentTable from "../../components/ui/AppointmentTable";
import useAdminStore from "../../store/AdminStore";
import { calculateAge } from "../../utils/calculateAge";
const AdminAppointmentsPage = () => {
    const { isLoading, adminAppointments, getAdminAppointments } = useAdminStore();
    useEffect(() => {
        getAdminAppointments();
    }, []);
    if (isLoading) {
        return <LoaderDashboard />;
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
                        <p>Doctor</p>

                        <p className="text-center">Action</p>
                    </div>
                    <div className="bg-white rounded-b-lg shadow-sm border border-gray-200">
                        {adminAppointments.map((appointment, index) => (
                            <AppointmentTable
                                key={index}
                                appointmentId={appointment?._id}
                                patient={appointment.userId?.name}
                                image={appointment.userId?.profilePicture}
                                payment={appointment.payment}
                                age={calculateAge(appointment.userId?.birthday)}
                                fee={appointment?.fees}
                                status={appointment?.status}
                                date={appointment?.date}
                                doctor={appointment.doctorId?.name}
                                doctorImage={appointment.doctorId?.profilePicture}
                                isAdmin={true}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AdminAppointmentsPage;