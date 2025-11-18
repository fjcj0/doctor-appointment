import { motion } from 'framer-motion';
import Card from './ui/Card';
import { useEffect } from 'react';
import useScreenStore from '../store/ScreenStore';
import Loader from '../tools/Loader';
const Doctors = () => {
    const { limitedDoctorsScreen, getLimitedDoctorsScreen, isDoctorLimitingLoading } = useScreenStore();
    useEffect(() => {
        getLimitedDoctorsScreen();
    }, []);
    if (isDoctorLimitingLoading) {
        return (
            <div className='flex items-start justify-center'>
                <Loader firSpinnerSize='w-20 h-20' secondSpinnerSize='w-14 h-14' />
            </div>
        );
    }
    return (
        <div className="w-full my-20 flex flex-col gap-2 items-center justify-center">
            <motion.h1
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="font-bold text-2xl text-black font-nunito"
            >
                Top Doctors to Book
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: 1 }}
                viewport={{ once: true }}
                className="text-sm text-center font-nunito max-w-[100%] md:max-w-[40%]"
            >
                Simply browse through our extensive list of trusted doctors.
            </motion.p>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                {
                    limitedDoctorsScreen.map((doctor, index) => (
                        <Card
                            key={index}
                            id={doctor._id}
                            name={doctor.name}
                            profilePicture={doctor.profilePicture}
                            available={doctor.available}
                            specialtiy={doctor.speciality}
                            index={index}
                            isForAdmin={false}
                        />
                    ))
                }
            </div>
            <motion.a
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 1 }}
                viewport={{ once: true }}
                href='/all-doctors' className='font-nunito underline text-lg font-bold mt-2'>
                More
            </motion.a>
        </div>
    );
}

export default Doctors;