import { useEffect, useState } from "react";
import AppointmentTable from "../../components/ui/AppointmentTable";
import { appointments } from "../../constants/data";
import LoaderDashboard from "../../tools/LoaderDashboard";
const DoctorAppointmentsPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    if (isLoading) {
        return <LoaderDashboard />;
    }
    return (
        <div className="p-6 font-nunito">
            <h1 className="text-xl font-bold text-gray-800 mb-6">Appointments</h1>
            <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                    <div className="grid grid-cols-6 gap-4 py-3 px-2 bg-gray-100 rounded-t-lg font-semibold text-gray-700 border-x-[0.5px] border-gray-300 border-t-[0.5px]">
                        <p>Patient</p>
                        <p>Payment</p>
                        <p className="text-center">Age</p>
                        <p className="text-center">Date & Time</p>
                        <p className="text-center">Fees</p>
                        <p className="text-center">Action</p>
                    </div>
                    <div className="bg-white rounded-b-lg shadow-sm border border-gray-200">
                        {appointments.map((appointment, index) => (
                            <AppointmentTable
                                key={index}
                                patient={appointment.pateint}
                                image={appointment.image}
                                payment={appointment.payment}
                                age={appointment.age}
                                fee={appointment.Fee}
                                status={appointment.status}
                                date={appointment.Date}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DoctorAppointmentsPage;