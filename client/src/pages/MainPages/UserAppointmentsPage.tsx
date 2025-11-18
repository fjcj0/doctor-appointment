import CardUserAppointments from "../../components/ui/CardUserAppointments";
import { motion } from 'framer-motion';
import useUserStore from "../../store/UserStore";
import { useEffect } from "react";
import Loader from "../../tools/Loader";
const UserAppointmentsPage = () => {
    const { userAppointments, getUserAppointments, isLoading } = useUserStore();
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };
    useEffect(() => {
        getUserAppointments();
    }, []);
    console.log(userAppointments);
    if (isLoading) {
        return (
            <Loader
                content_loader_style='w-full h-[70vh] flex items-center justify-center'
                firSpinnerSize='w-20 h-20'
                secondSpinnerSize='w-14 h-14'
            />
        );
    }
    return (
        <section className="my-10">
            <div className="w-full">
                <h1 className="font-bold text-xl text-black/60 font-nunito">My appointments</h1>
            </div>
            {userAppointments.length === 0 ? (
                <div className="w-full h-[50vh] flex items-center justify-center">
                    <p className="text-gray-500 text-lg">No appointments yet</p>
                </div>
            ) : (
                <motion.div
                    className="my-2 flex flex-col gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {userAppointments.map((userAppointment, index) => (
                        <CardUserAppointments
                            index={index}
                            fees={userAppointment.fees}
                            appointmentId={userAppointment._id}
                            doctorId={userAppointment.doctorId._id}
                            key={index}
                            name={userAppointment.doctorId.name}
                            image={userAppointment.doctorId.profilePicture}
                            date={userAppointment.date}
                            address={userAppointment.doctorId.address}
                            isCompleted={userAppointment.status === 'completed'}
                            isCancelled={userAppointment.status === 'cancelled'}
                            specail={userAppointment.doctorId.speciality}
                        />
                    ))}
                </motion.div>
            )}
        </section>
    );
}
export default UserAppointmentsPage;