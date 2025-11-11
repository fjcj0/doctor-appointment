import { motion } from 'framer-motion';
const Card = ({
    image,
    available,
    name,
    specail,
    index
}: {
    image: string,
    available: boolean,
    name: string,
    specail: string,
    index: number
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut"
            }}
            viewport={{ once: true, margin: "-20px" }}
            className="w-full rounded-lg border-[0.3px] border-gray-400 flex flex-col font-nunito items-start justify-start bg-white shadow-sm"
        >
            <div className="bg-[#EAEFFF] hover:bg-purple-2 duration-300  transition-all w-full items-center rounded-t-lg justify-center overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className=""
                />
            </div>
            <div className="flex flex-col gap-3 p-3">
                <div className="flex items-center justify-start gap-2">
                    <span className={`w-3 h-3 rounded-full ${available ? 'bg-green-500' : 'bg-red-500'}`} />
                    <p className={`${available ? 'text-green-500' : 'text-red-500'} text-sm font-medium`}>
                        {available ? 'Available' : 'Not Available'}
                    </p>
                </div>
                <h1 className="text-black font-bold text-xl">
                    {name}
                </h1>
                <p className="text-black/50 text-xs font-semibold">
                    {specail}
                </p>
            </div>
        </motion.div>
    );
}
export default Card;