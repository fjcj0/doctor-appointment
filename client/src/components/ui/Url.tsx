import { Link } from "react-router-dom";
import useSlideStore from "../../store/SlideStore";
const Url = ({
    isActive,
    direct,
    text,
    icon
}: {
    isActive: boolean,
    direct: string,
    text: string,
    icon: string
}) => {
    const { isSlideOpen } = useSlideStore();
    return (
        <Link
            to={direct}
            className={`text-black gap-2 py-3 font-nunito flex w-full items-start justify-start hover:bg-purple-1 ${isActive && 'bg-purple-1 border-r-[3px] border-r-purple-2'
                } duration-300 transition-all`}
        >

            <div className="pl-5 flex gap-2 items-center justify-center">
                <img src={icon} className="w-5" alt={text} />
                <span className={`${isSlideOpen
                    ? 'opacity-100 max-w-[200px]'
                    : 'opacity-0 max-w-0'
                    } max-md:hidden duration-300 transition-all overflow-hidden whitespace-nowrap`}>
                    {text}
                </span>
            </div>
        </Link>
    );
}
export default Url;