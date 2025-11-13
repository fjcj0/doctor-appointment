import { XIcon, CheckIcon } from "lucide-react";
const Table = ({
    image,
    name,
    date,
    status,
    isAdminPage = false
}: {
    image: string,
    name: string,
    date: string,
    status: string,
    isAdminPage: boolean
}) => {
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
                            <button type="button" className="w-7 h-7 bg-red-500/20 rounded-full items-center justify-center flex">
                                <XIcon size={17} color="#E9A0A9" />
                            </button>
                            {!isAdminPage && <button type="button" className="w-7 h-7 bg-green-400/20 rounded-full items-center justify-center flex">
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