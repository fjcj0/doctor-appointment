import { Link } from "react-router-dom";
import { headerImage, peopleImage } from "../constants/data";
import { motion } from 'framer-motion';
const HeaderHome = () => {
    return (
        <section className="w-full flex md:flex-row gap-10 flex-col my-5 pt-20 lg:pt-32 rounded-lg px-5 bg-purple-2 items-center justify-between">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: 1 }}
                viewport={{ once: true }}
                className="flex flex-col gap-6 items-start justify-start pl-4 mb-3">
                <h1 className="text-white font-bold text-5xl font-parkinsans">Book Appointment<br />With Trusted Doctors</h1>
                <div className="flex gap-2 items-center justify-start">
                    <img src={peopleImage} className="w-28" />
                    <p className="text-white font-poppins text-xs ">Simply browse through our extensive list of trusted doctors,
                        schedule your appointment hassle-free.</p>
                </div>
                <Link to={'/all-doctors'} className="hover:text-black text-white hover:bg-white border-[0.3px] border-white  duration-300 transition-all px-3 py-4 font-bold font-poppins">
                    Book Appointment
                </Link>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: 2 }}
                viewport={{ once: true }}
                className="self-end">
                <img src={headerImage} alt="header img" className="w-[40rem]" />
            </motion.div>
        </section>
    );
}
export default HeaderHome;