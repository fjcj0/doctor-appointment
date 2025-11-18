import type { cardUserProps } from "../../global";
import { Button } from "./Button";
import { motion } from 'framer-motion';
const CardUserAppointments = ({
    image,
    name,
    specail,
    address,
    date,
    isCancelled,
    index
}: cardUserProps) => {
    const handlePay = async () => {

    }
    const handleCancel = async () => {

    }
    const cardVariants = {
        hidden: (index: number) => ({
            opacity: 0,
            x: index % 2 === 0 ? 100 : -100
        }),
        visible: (index: number) => ({
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut" as const,
                delay: index * 0.3
            }
        })
    };
    return (
        <motion.div
            className="flex items-end justify-between border-y-[0.3px] border-black py-5"
            variants={cardVariants}
            custom={index}
            initial="hidden"
            animate="visible"
        >
            <div className="flex items-end justify-start gap-7">
                <div className="bg-[#EAEFFF] hover:bg-purple-2 duration-300 transition-all rounded-xl flex items-center justify-center">
                    <img src={image} className="w-40" alt={name} />
                </div>
                <div className="flex flex-col items-start justify-start font-nunito gap-2">
                    <h1 className="font-bold text-lg text-black">{name}</h1>
                    <p className="text-black/50">{specail}</p>
                    <p className="flex gap-2 text-black">Address: <span className="text-black/50">{address}</span></p>
                    <p className="flex gap-2 text-black">Date & Time: <span className="text-black/50">{date}</span></p>
                </div>
            </div>
            <div className="">
                {
                    !isCancelled ? <div className="flex flex-col font-nunito gap-2">
                        <Button text="Pay Online" hoverColor="bg-purple-2" handleClick={handlePay} />
                        <Button text="Cancel Appointment" hoverColor="bg-red-500" handleClick={handleCancel} />
                    </div>
                        :
                        <p className="border-[0.3px] border-red-500 text-red-500 rounded-lg px-5 py-2 font-nunito">Appointment Cancelled</p>
                }
            </div>
        </motion.div>
    );
}
export default CardUserAppointments;