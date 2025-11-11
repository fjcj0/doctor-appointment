import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { appointmentImage } from "../constants/data";
import { motion } from 'framer-motion';
const EndeSctionHome = () => {
    return (
        <section className="w-full flex gap-y-20 lg:flex-row pt-28 flex-col my-20 items-center justify-between bg-purple-2 rounded-lg">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: 1 }}
                viewport={{ once: true }}
                className="flex px-5 flex-col gap-3 items-start mb-5 justify-start">
                <h1 className="text-3xl md:text-6xl text-white font-bold font-parkinsans">Book Appointment
                    With 100+ Trusted Doctors</h1>
                <Link
                    to={'/create-account'}
                    className="relative flex font-nunito items-center justify-center font-bold text-black px-3 py-4 border-[0.3px] border-white overflow-hidden group transition-all duration-300"
                >
                    <span className="absolute bottom-0 left-0 w-full h-0 bg-white transition-all duration-300 ease-out group-hover:h-full"></span>
                    <span className="relative z-10 flex items-center">
                        Create account <ArrowRight color='black' className="ml-2 group-hover:text-black transition-colors duration-300" />
                    </span>
                </Link>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: 2 }}
                viewport={{ once: true }}
                className="pr-3 overflow-visible self-end">
                <img
                    src={appointmentImage}
                    className="min-w-56 -mt-40"
                />
            </motion.div>
        </section>
    );
}
export default EndeSctionHome;