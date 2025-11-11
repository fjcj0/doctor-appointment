import { useState } from "react";
import Card from "../../components/ui/Card";
import { doctors, filterIcon, specialties } from "../../constants/data";
import { motion, AnimatePresence } from 'framer-motion';
const DoctorsPage = () => {
    const [special, setSpecial] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        },
        exit: {
            opacity: 0,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    };
    const itemVariants = {
        hidden: {
            opacity: 0,
            y: -20,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 24
            }
        },
        exit: {
            opacity: 0,
            y: -10,
            scale: 0.95,
            transition: {
                duration: 0.2
            }
        }
    };
    const handleSpecialtySelect = (specialtyText: string) => {
        setSpecial(prevSpecial => prevSpecial === specialtyText ? '' : specialtyText);
    };
    const getButtonClassName = (specialtyText: string) => {
        const baseClasses = "px-3 py-2 duration-300 transition-all w-full flex items-start justify-start font-nunito border-[0.3px] border-gray-300 rounded-lg";
        const isActive = special === specialtyText;

        if (isActive) {
            return `${baseClasses} bg-purple-2 text-white`;
        } else {
            return `${baseClasses} hover:bg-purple-2 hover:text-white`;
        }
    };
    const filteredDoctors = special
        ? doctors.filter(doctor =>
            doctor.specail.toLowerCase().includes(special.toLowerCase()) ||
            special.toLowerCase().includes(doctor.specail.toLowerCase())
        )
        : doctors;
    return (
        <section className="flex flex-col my-10">
            <button
                type="button"
                className="flex md:hidden items-center justify-center self-start mb-5 font-nunito font-bold px-3 py-1 border-[0.3px] border-purple-2 rounded-lg hover:bg-purple-2 hover:text-white duration-300 gap-2"
                onClick={() => setFilterOpen(!filterOpen)}
            >
                Filter
                <img src={filterIcon} className="w-5" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-9 gap-3">
                <AnimatePresence mode="wait">
                    {filterOpen && (
                        <motion.div
                            key="mobile-filter"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="col-span-2 md:hidden flex flex-col items-start gap-3 justify-start"
                        >
                            {specialties.map((specialty, index) => (
                                <motion.button
                                    key={index}
                                    variants={itemVariants}
                                    type="button"
                                    className={getButtonClassName(specialty.text)}
                                    onClick={() => handleSpecialtySelect(specialty.text)}
                                >
                                    {specialty.text}
                                </motion.button>
                            ))}
                        </motion.div>
                    )}
                    <motion.div
                        key="desktop-filter"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="hidden md:flex col-span-2 flex-col items-start gap-3 justify-start"
                    >
                        {specialties.map((specialty, index) => (
                            <motion.button
                                key={index}
                                variants={itemVariants}
                                type="button"
                                className={getButtonClassName(specialty.text)}
                                onClick={() => handleSpecialtySelect(specialty.text)}
                            >
                                {specialty.text}
                            </motion.button>
                        ))}
                    </motion.div>
                </AnimatePresence>
                <div className="col-span-7 grid grid-cols-2 gap-4 md:grid-cols-4">
                    {filteredDoctors.length > 0 ? (
                        filteredDoctors.map((doctor, index) => (
                            <Card
                                key={index}
                                available={doctor.available}
                                name={doctor.name}
                                specail={doctor.specail}
                                index={index}
                                image={doctor.image}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10">
                            <p className="text-gray-500 font-nunito text-lg">
                                No doctors found for "{special}"
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
export default DoctorsPage;