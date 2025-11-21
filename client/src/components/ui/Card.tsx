import { motion } from 'framer-motion';
import useAdminStore from '../../store/AdminStore';
import { useState } from 'react';
const Card = ({
    profilePicture,
    available,
    name,
    id,
    specialtiy,
    index,
    isCheckAble,
    isForAdmin
}: {
    profilePicture: string,
    available: boolean,
    name: string,
    specialtiy: string,
    id: string,
    index: number,
    isCheckAble?: boolean,
    isForAdmin: boolean
}) => {
    function goToItem() {
        if (!isForAdmin)
            window.location.href = `/appointment/${id}`;
    }
    const { changeAvailable } = useAdminStore();
    const [isLoading, setIsLoading] = useState(false);
    const [localAvailable, setLocalAvailable] = useState(available);
    const onChangleAvailable = async () => {
        setIsLoading(true);
        try {
            await changeAvailable(id);
            setLocalAvailable(!localAvailable);
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        } finally {
            setIsLoading(false);
        }
    }
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
            onClick={goToItem}
            className={`w-full rounded-lg border-[0.3px] border-gray-400 flex flex-col font-nunito items-start justify-start bg-white shadow-sm ${!isForAdmin && 'cursor-pointer'}`}
        >
            <div className="bg-[#EAEFFF] hover:bg-purple-2 duration-300  transition-all w-full items-center rounded-t-lg justify-center overflow-hidden">
                <img
                    src={profilePicture}
                    alt={name}
                    className=""
                />
            </div>
            <div className="flex flex-col gap-3 p-3">
                <div className="flex items-center justify-start gap-2">
                    <span className={`w-3 h-3 rounded-full ${localAvailable ? 'bg-green-500' : 'bg-red-500'}`} />
                    <p className={`${localAvailable ? 'text-green-500' : 'text-red-500'} text-sm font-medium`}>
                        {localAvailable ? 'Available' : 'Not Available'}
                    </p>
                </div>
                <h1 className="text-black font-bold text-xl">
                    {name}
                </h1>
                <p className="text-black/50 text-xs font-semibold">
                    {specialtiy}
                </p>
                {
                    isCheckAble !== undefined && typeof available === 'boolean' &&
                    <label htmlFor="" className='flex items-center justify-start gap-2'>
                        <input
                            type="checkbox"
                            checked={localAvailable}
                            onChange={onChangleAvailable}
                            disabled={isLoading}
                            className={`cursor-pointer ${isLoading ? 'opacity-50' : ''}`}
                        />
                        Available
                    </label>
                }
            </div>
        </motion.div>
    );
}
export default Card;