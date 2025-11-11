import CardUserAppointments from "../../components/ui/CardUserAppointments";
import { userAppointments } from "../../constants/data";
import { motion } from 'framer-motion';
const UserAppointmentsPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };
    return (
        <section className="my-10">
            <div className="w-full">
                <h1 className="font-bold text-xl text-black/60 font-nunito">My appointments</h1>
            </div>
            <motion.div
                className="my-2 flex flex-col gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {userAppointments.map((userAppointment, index) => (
                    <CardUserAppointments
                        key={index}
                        name={userAppointment.name}
                        image={userAppointment.image}
                        date={userAppointment.date}
                        address={userAppointment.address}
                        isCancelled={userAppointment.isCancelled}
                        specail={userAppointment.specail}
                        index={index}
                    />
                ))}
            </motion.div>
        </section>
    );
}
export default UserAppointmentsPage;