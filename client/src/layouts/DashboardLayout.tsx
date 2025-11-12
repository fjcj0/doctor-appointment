import HeaderDashboard from "../components/HeaderDashboard";
import Slider from "../components/ui/Slider";
import type { linksProps } from "../global";
import { Outlet } from "react-router-dom";
import useSlideStore from "../store/SlideStore";
const DashboardLayout = ({
    typeHeader,
    links
}: {
    typeHeader: 'doctor' | 'admin',
    links: linksProps[],
}) => {
    const { isSlideOpen } = useSlideStore();
    return (
        <div className="w-full min-h-[100vh]">
            <div className="h-[10%]">
                <HeaderDashboard typeHeader={typeHeader} />
            </div>
            <div className={`fixed h-full ${!isSlideOpen ? 'w-0' : 'w-[4rem]'} ${!isSlideOpen ? 'md:w-[4rem]' : 'md:w-[18rem]'} duration-300 transition-all`}>
                <Slider links={links} />
            </div>
            <div className={`absolute ${!isSlideOpen ? 'w-[100%]' : 'w-[calc(100%-4rem)]'} ${!isSlideOpen ? 'md:w-[calc(100%-4rem)]' : 'md:w-[calc(100%-18rem)]'} h-[90%] bg-[#F8F9FD] right-0 duration-300 transition-all`}>
                <Outlet />
            </div>
        </div >
    );
}
export default DashboardLayout