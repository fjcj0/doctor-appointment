import { CheckIcon, XIcon } from "lucide-react";
import type { AppointmentTableProps } from "../../global";
const AppointmentTable = ({
    patient,
    image,
    payment,
    age,
    date,
    fee,
    status,
    doctor,
    doctorImage,
    onCancel,
    onConfirm
}: AppointmentTableProps) => {
    return (
        <div className="grid grid-cols-7 gap-5 items-center py-4 px-2 text-xs border-b border-gray-200 hover:bg-gray-50 transition-colors min-w-[800px]">
            <div className="flex items-center gap-2">
                <img src={image} alt={patient} className="rounded-full w-10 h-10 object-cover max-md:hidden" />
                <p className="text-gray-800 font-medium">{patient}</p>
            </div>
            <div className="w-full place-items-start place-content-center">
                <p className="rounded-full border px-3 py-2 border-gray-300 text-gray-700 text-center bg-white">
                    {payment}
                </p>
            </div>
            <p className="text-gray-600 text-center">{age}</p>
            <p className="text-gray-600 text-center">{date}</p>
            <p className="text-gray-800 font-medium text-center">{fee}</p>
            {
                doctor
                &&
                <div className="flex items-center gap-2">
                    <img src={doctorImage} alt={doctor} className="rounded-full w-10 h-10 object-cover max-md:hidden" />
                    <p className="text-gray-800 font-medium">{doctor}</p>
                </div>
            }
            <div className="flex items-center justify-center">
                {status === 'pending' ? (
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors"
                        >
                            <XIcon size={16} className="text-red-500" />
                        </button>
                        {
                            !doctor && <button
                                type="button"
                                className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors"
                            >
                                <CheckIcon size={16} className="text-green-500" />
                            </button>
                        }

                    </div>
                ) : (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                )}
            </div>
        </div>
    );
};
export default AppointmentTable;