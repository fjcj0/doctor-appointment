import type { LucideIcon } from "lucide-react";
const CardDashboard = ({
    title,
    value,
    icon: Icon,
    color,
    isMoney
}: {
    title: string,
    value: number,
    icon: LucideIcon,
    color: string,
    isMoney: boolean,
}) => {
    const colorClasses: { [key: string]: string } = {
        red: "bg-red-500/50",
        blue: "bg-blue-500/50",
        green: "bg-green-500/50",
        yellow: "bg-yellow-500/50",
        purple: "bg-purple-500/50",
    };
    const bgClass = colorClasses[color] || "bg-gray-500/50";
    return (
        <div className="font-nunito flex justify-between items-center px-4 py-4 bg-white shadow-sm rounded-3xl border-[0.5px] border-gray-400">
            <div className={`${bgClass} rounded-2xl px-2 py-2 flex items-center justify-center`}>
                <Icon size={20} color={color} />
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
                <p className="text-black/50">{title}</p>
                <h1 className="font-bold text-black">{isMoney && '$'} {value}</h1>
            </div>
        </div>
    );
}

export default CardDashboard;