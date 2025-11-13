import { useState, useEffect } from "react";
import CardDashboard from "../../components/ui/CardDashboard";
import Table from "../../components/ui/Table";
import { bookings, dataCardDashboardDoctor } from "../../constants/data";
import { ListIcon } from "lucide-react";
import LoaderDashboard from "../../tools/LoaderDashboard";
const DashboardDoctorPage = () => {
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
        <div className="p-5">
            <div className="grid max-w-3xl grid-cols-1 md:grid-cols-3 gap-3">
                {dataCardDashboardDoctor.map((infoCardDash, index) => (
                    <CardDashboard
                        key={index}
                        title={infoCardDash.title}
                        color={infoCardDash.color}
                        icon={infoCardDash.icon}
                        isMoney={infoCardDash.isMoney}
                        value={infoCardDash.value} />
                ))}
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
                        {bookings.map((booking, index) => (
                            <Table
                                key={index}
                                name={booking.name}
                                date={booking.Date}
                                image={booking.image}
                                status={booking.status}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DashboardDoctorPage;