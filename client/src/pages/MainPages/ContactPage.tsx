import { motion } from 'framer-motion';
import { contactImage } from '../../constants/data';
const ContactPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6
            }
        }
    };
    const imageVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8
            }
        }
    };
    const contentVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8
            }
        }
    }
    return (
        <section className="my-20">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                <motion.div
                    variants={itemVariants}
                    className="text-center text-2xl pt-10 text-[#707070]"
                >
                    <p>CONTACT <span className="text-gray-700 font-semibold">US</span></p>
                </motion.div>
                <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
                    <motion.img
                        variants={imageVariants}
                        className="w-full md:max-w-[360px]"
                        src={contactImage}
                        alt="Contact Prescripto"
                    />
                    <motion.div
                        variants={contentVariants}
                        className="flex flex-col justify-center items-start gap-6"
                    >
                        <motion.p
                            variants={itemVariants}
                            className="font-semibold text-lg text-gray-600"
                        >
                            OUR OFFICE
                        </motion.p>
                        <motion.p
                            variants={itemVariants}
                            className="text-gray-500"
                        >
                            00000 Willms Station <br /> Suite 000, Washington, USA
                        </motion.p>
                        <motion.p
                            variants={itemVariants}
                            className="text-gray-500"
                        >
                            Tel: (000) 000-0000 <br /> Email: greatstackdev@gmail.com
                        </motion.p>
                        <motion.p
                            variants={itemVariants}
                            className="font-semibold text-lg text-gray-600"
                        >
                            CAREERS AT PRESCRIPTO
                        </motion.p>
                        <motion.p
                            variants={itemVariants}
                            className="text-gray-500"
                        >
                            Learn more about our teams and job openings.
                        </motion.p>
                        <motion.button
                            className="border border-black px-8 font-bold font-nunito py-5  hover:bg-black hover:text-white transition-all duration-500"
                        >
                            Explore Jobs
                        </motion.button>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
export default ContactPage;