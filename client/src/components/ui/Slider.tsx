import { useLocation } from "react-router";
import type { linksProps } from "../../global";
import Url from "./Url";
const Slider = ({
    links
}: {
    links: linksProps[]
}) => {
    const location = useLocation();
    return (
        <aside className="sticky w-full h-full flex flex-col pt-6 border-r-[1px] border-r-gray-300">
            <div className="flex flex-col gap-3">
                {
                    links.map((link, index) => {
                        const isActive = link.direct === location.pathname;
                        return (
                            <Url
                                key={index}
                                direct={link.direct}
                                text={link.text}
                                isActive={isActive}
                                icon={link.icon}
                            />
                        );
                    })
                }
            </div>
        </aside>
    );
}
export default Slider;