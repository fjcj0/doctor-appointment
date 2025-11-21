import { XIcon, CheckIcon } from "lucide-react";
import useDoctorStore from "../../store/DoctorStore";
import { useState } from "react";
import useAdminStore from "../../store/AdminStore";
const Table = ({
    appointmentId,
    image,
    name,
    date,
    status,
    isAdminPage = false
}: {
    appointmentId: string,
    image: string,
    name: string,
    date: string,
    status: string,
    isAdminPage: boolean
}) => {
    const { doctorCancelAppointment, doctorAcceptAppointment } = useDoctorStore();
    const { adminCancelAppointment } = useAdminStore();
    const [isCancelling, setIsCancelling] = useState(false);
    const [isAccepting, setIsAccepting] = useState(false);
    const handleCancel = async () => {
        if (!isAdminPage) {
            setIsCancelling(true);
            try {
                await doctorCancelAppointment(appointmentId);
            } catch (error) {
                console.log(error instanceof Error ? error.message : error);
            } finally {
                setIsCancelling(false);
            }
        } else {
            setIsCancelling(true);
            try {
                await adminCancelAppointment(appointmentId);
            } catch (error) {
                console.log(error instanceof Error ? error.message : error);
            } finally {
                setIsCancelling(false);
            }
        }
    }
    const handleCAceept = async () => {
        setIsAccepting(true);
        try {
            await doctorAcceptAppointment(appointmentId);
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        } finally {
            setIsAccepting(false);
        }
    }
    return (
        <div className="font-nunito flex items-center justify-between">
            <div className="flex items-start justify-center gap-3">
                <img src={image} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex flex-col items-start justify-start">
                    <h1 className="text-black font-bold">{name}</h1>
                    <p className="text-black/50 text-sm"> {date}</p>
                </div>
            </div>
            <div className="flex items-center justify-center gap-2">
                {
                    status == 'pending' ?
                        <div className="flex items-start justify-start gap-3">
                            <button type="button" disabled={isCancelling} onClick={handleCancel} className={`w-7 h-7 bg-red-500/20 rounded-full items-center justify-center flex ${isCancelling && 'opacity-50'}`}>
                                <XIcon size={17} color="#E9A0A9" />
                            </button>
                            {!isAdminPage && <button type="button" onClick={handleCAceept} disabled={isAccepting} className={`w-7 h-7 bg-green-400/20 rounded-full items-center justify-center flex ${isAccepting && 'opacity-50'}`}>
                                <CheckIcon size={17} color="#ACD4C3" />
                            </button>}
                        </div>
                        :
                        <p className={`px-4 py-2 rounded-3xl text-xs ${status == 'completed' ? 'bg-green-400/20 text-green-400' : 'bg-red-400/20 text-red-400'}`}>
                            {status}
                        </p>
                }
            </div>
        </div>
    );
}
export default Table;