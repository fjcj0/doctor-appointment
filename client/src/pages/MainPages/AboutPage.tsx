import { aboutImage } from "../../constants/data";
import { motion } from 'framer-motion';
const AboutPage = () => {
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
    };
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6
            }
        }
    };
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
                    <p>ABOUT <span className="text-gray-700 font-semibold">US</span></p>
                </motion.div>
                <div className="my-10 flex flex-col md:flex-row gap-12">
                    <motion.img
                        variants={imageVariants}
                        className="w-full md:max-w-[360px]"
                        src={aboutImage}
                        alt="About Prescripto"
                    />
                    <motion.div
                        variants={contentVariants}
                        className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600"
                    >
                        <p>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
                        <p>Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
                        <b className="text-gray-800">Our Vision</b>
                        <p>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
                    </motion.div>
                </div>
                <motion.div
                    variants={itemVariants}
                    className="text-xl my-4"
                >
                    <p>WHY  <span className="text-gray-700 font-semibold">CHOOSE US</span></p>
                </motion.div>
                <motion.div
                    variants={containerVariants}
                    className="flex flex-col md:flex-row mb-20"
                >
                    <motion.div
                        variants={cardVariants}
                        className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-purple-2 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer"
                    >
                        <b>EFFICIENCY:</b>
                        <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
                    </motion.div>
                    <motion.div
                        variants={cardVariants}
                        className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-purple-2 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer"
                    >
                        <b>CONVENIENCE: </b>
                        <p>Access to a network of trusted healthcare professionals in your area.</p>
                    </motion.div>
                    <motion.div
                        variants={cardVariants}
                        className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-purple-2 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer"
                    >
                        <b>PERSONALIZATION:</b>
                        <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
export default AboutPage;