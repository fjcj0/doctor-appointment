import { Book, Heart, ListIcon, User } from "lucide-react";
import CardDashboard from "../../components/ui/CardDashboard";
import Table from "../../components/ui/Table";
import { useEffect, useState } from "react";
import LoaderDashboard from "../../tools/LoaderDashboard";
import useAdminStore from "../../store/AdminStore";
const DashboardAdminPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { getTotalAppointments, getTotalDoctors, getTotalPatients, getAdminAppointmentsLimited, adminAppointmentsLimited, patients, appointments, doctors } = useAdminStore();
    const handleData = async () => {
        setIsLoading(true);
        try {
            await getTotalAppointments();
            await getTotalDoctors();
            await getTotalPatients();
            await getAdminAppointmentsLimited();
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        handleData();
    }, []);
    if (isLoading) {
        return <LoaderDashboard />;
    }
    return (
        <div className="p-5">
            <div className="grid max-w-3xl grid-cols-1 md:grid-cols-3 gap-3">
                <CardDashboard
                    title={'Total Doctors'}
                    color={'blue'}
                    icon={Heart}
                    isMoney={false}
                    value={doctors}
                />
                <CardDashboard
                    title={'Total Appointments'}
                    color={'green'}
                    icon={Book}
                    isMoney={false}
                    value={appointments}
                />
                <CardDashboard
                    title={'Total Patients'}
                    color={'red'}
                    icon={User}
                    isMoney={false}
                    value={patients}
                />
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
                        {adminAppointmentsLimited.map((booking, index) => (
                            <Table
                                key={index}
                                appointmentId={booking?._id}
                                name={booking.userId?.name}
                                date={booking?.date}
                                image={booking.userId?.profilePicture}
                                isAdminPage={true}
                                status={booking?.status}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DashboardAdminPage;