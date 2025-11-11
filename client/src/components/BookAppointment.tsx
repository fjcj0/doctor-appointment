import { MessageSquareWarningIcon } from "lucide-react";
import { blueTick, dates, times } from "../constants/data";
import type { doctorInformationProps } from "../global";
import { useState } from "react";
const BookAppointment = ({ image, name, specail, year_experince, about, fee }: doctorInformationProps) => {
    const onBook = async () => {
        console.log("Booking appointment:", { selectedDate, selectedTime });
    }
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
    };
    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
    };
    return (
        <div className="grid font-nunito grid-cols-1 md:grid-cols-6 gap-3">
            <div className="md:col-span-2 h-[16rem] flex items-end justify-center bg-purple-1 hover:bg-purple-2 duration-300 transition-all rounded-2xl">
                <img src={image} className="w-60" />
            </div>
            <div className="md:col-span-4">
                <div className="flex flex-col py-10 px-5 border-[0.5px] border-black rounded-2xl">
                    <div className=" mb-2 flex flex-col gap-2">
                        <h1 className="flex text-3xl text-black gap-2 items-center justify-start">
                            {name}
                            <img src={blueTick} className="w-10" />
                        </h1>
                        <h1 className="flex text-lg items-center gap-2 text-black justify-start">
                            {specail}
                            <span className="px-4 text-xs py-2 border-[0.3px] border-gray-300 rounded-3xl">{year_experince} Year</span>
                        </h1>
                    </div>
                    <div className=" mb-2 flex flex-col gap-2">
                        <h1 className="flex text-black items-center gap-2 justify-start">
                            About
                            <MessageSquareWarningIcon />
                        </h1>
                        <p className="text-black/50 text-sm">{about}</p>
                    </div>
                    <p className="text-lg text-black/50 font-bold">Appointment fee: <span className="text-black">{fee}</span></p>
                </div>
                <div className="flex flex-col items-start justify-start my-5">
                    <h1 className="text-black/65 font-bold">Booking slots</h1>
                    <div className="flex flex-shrink-0 max-w-[95%] overflow-x-auto gap-3 my-3">
                        {dates.map((date, index) => {
                            const dateString = `${date.day} ${date.month}`;
                            const isActive = selectedDate === dateString;
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleDateSelect(dateString)}
                                    className={`flex flex-col items-center justify-center px-4 py-3 rounded-full border-[0.5px] font-bold min-w-[70px] transition-all duration-300 ${isActive
                                        ? 'bg-purple-1 border-purple-1 text-white'
                                        : 'bg-transparent border-gray-500 hover:bg-purple-2'
                                        }`}
                                >
                                    <span className="text-sm font-semibold">{date.day}</span>
                                    <span className="text-xs">{date.month}</span>
                                </button>
                            );
                        })}
                    </div>
                    <div className="flex flex-shrink-0 max-w-[95%] overflow-x-auto gap-3 my-3">
                        {times.map((time, index) => {
                            const isActive = selectedTime === time;
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleTimeSelect(time)}
                                    className={`flex items-center justify-center text-sm py-3 px-4 rounded-full border-[0.5px] font-bold min-w-[100px] transition-all duration-300 whitespace-nowrap ${isActive
                                        ? 'bg-purple-1 border-purple-1 text-white'
                                        : 'bg-transparent border-gray-500 hover:bg-purple-2'
                                        }`}
                                >
                                    {time}
                                </button>
                            );
                        })}
                    </div>
                    <div className="flex items-start justify-start my-3">
                        <button
                            onClick={onBook}
                            type="button"
                            disabled={!selectedDate || !selectedTime}
                            className={`rounded-lg px-6 py-3 font-nunito font-bold duration-300 transition-all border-[0.5px] border-gray-300 text-base ${selectedDate && selectedTime
                                ? 'bg-purple-1 hover:bg-purple-2 cursor-pointer'
                                : 'bg-gray-300 cursor-not-allowed text-gray-500'
                                }`}
                        >
                            Book an appointment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default BookAppointment;