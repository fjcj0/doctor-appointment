import { useState, useEffect } from "react";
import CardDashboard from "../../components/ui/CardDashboard";
import Table from "../../components/ui/Table";
import { DollarSign, ListIcon } from "lucide-react";
import LoaderDashboard from "../../tools/LoaderDashboard";
import useDoctorStore from "../../store/DoctorStore";
const DashboardDoctorPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { getDoctorAppointmentsLimited, doctorAppointmentsLimited, doctor, getNumberOfAppointments, getNumberOfPatients, patients, appointments } = useDoctorStore();
    const handleData = async () => {
        setIsLoading(true);
        try {
            await getDoctorAppointmentsLimited();
            await getNumberOfAppointments();
            await getNumberOfPatients();
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        handleData();
    }, []);
    console.log(doctorAppointmentsLimited);
    if (isLoading) {
        return <LoaderDashboard />;
    }
    return (
        <div className="p-5">
            <div className="grid max-w-3xl grid-cols-1 md:grid-cols-3 gap-3">
                <CardDashboard
                    title={'Earning'}
                    color={'green'}
                    icon={DollarSign}
                    isMoney={true}
                    value={doctor?.earning || 0} />
                <CardDashboard
                    title={'Appointments'}
                    color={'yellow'}
                    icon={DollarSign}
                    isMoney={false}
                    value={appointments || 0} />
                <CardDashboard
                    title={'Patients'}
                    color={'red'}
                    icon={DollarSign}
                    isMoney={false}
                    value={patients || 0} />
            </div>
            <div className="mt-10 font-nunito max-w-3xl flex flex-col items-start justify-start border-[0.5px] border-gray-400 rounded-xl gap-3">
                <div className="flex items-center justify-center gap-2  px-4 pt-4">
                    <div className="bg-purple-2/50 w-10 h-10 rounded-full  flex items-center justify-center">
                        <ListIcon size={20} color='black' />
                    </div>
                    <h1 className=" text-black font-bold">Latest Bookings</h1>
                </div>
                <div className="w-full border-t-[0.5px] border-t-gray-400">
                    <div className="px-4 pb-4 pt-4 flex flex-col gap-5 ">
                        {doctorAppointmentsLimited.map((booking, index) => (
                            <Table
                                key={index}
                                appointmentId={booking._id}
                                name={booking.userId.name}
                                date={booking.date}
                                image={booking.userId.profilePicture}
                                status={booking.status}
                                isAdminPage={false}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DashboardDoctorPage;