import { Link } from "react-router-dom";
const Url = ({ isActive, direct, text, icon }: {
    isActive: boolean,
    direct: string,
    text: string,
    icon: string
}) => {
    return (
        <Link to={direct} className={`w-full text-black gap-2 py-3 font-nunito flex items-start justify-start hover:bg-purple-1 ${isActive && 'bg-purple-1 border-r-[3px] border-r-purple-2'}`}>
            <div className="pl-5 flex gap-2 items-center justify-center">
                <img src={icon} className="w-5" />
                <span>{text}</span>
            </div>
        </Link>
    );
}
export default Url;