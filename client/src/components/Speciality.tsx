import { specialties } from "../constants/data";
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
const Speiality = () => {
    const slideInVariants: Variants = {
        hidden: {
            opacity: 0,
            x: -100
        },
        visible: (index: number) => ({
            opacity: 1,
            x: 0,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 12,
                delay: index * 0.1 + 1.5
            }
        }),
        hover: {
            y: -8,
            scale: 1.05,
            transition: {
                type: "spring" as const,
                stiffness: 400,
                damping: 10
            }
        }
    };
    return (
        <section className="w-full my-20 flex flex-col gap-2 items-center justify-center">
            <motion.h1
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="font-bold text-2xl text-black font-nunito"
            >
                Find by Speciality
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: 0.8 }}
                viewport={{ once: true }}
                className="text-sm text-center font-nunito max-w-[100%] md:max-w-[40%]"
            >
                Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
            </motion.p>
            <div className="flex flex-row gap-3 overflow-x-auto md:items-center md:justify-center w-full">
                {
                    specialties.map((specail, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            variants={slideInVariants}
                            initial="hidden"
                            whileInView="visible"
                            whileHover="hover"
                            viewport={{ once: true }}
                            className="w-[8rem] h-[10rem] flex flex-col items-center justify-center gap-2 flex-shrink-0 rounded-lg cursor-pointer"
                        >
                            <motion.img
                                src={specail.image}
                                alt={specail.text}
                                className="w-20"
                                whileHover={{
                                    scale: 1.1,
                                    rotate: 5
                                }}
                                transition={{ type: "spring" as const, stiffness: 400 }}
                            />
                            <motion.p
                                className="font-nunito text-xs text-center"
                            >
                                {specail.text}
                            </motion.p>
                        </motion.div>
                    ))
                }
            </div>
        </section>
    );
}
export default Speiality;