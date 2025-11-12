import HeaderDashboard from "../components/HeaderDashboard";
import Slider from "../components/ui/Slider";
import type { linksProps } from "../global";
import { Outlet } from "react-router-dom";
const DashboardLayout = ({
    typeHeader,
    links
}: {
    typeHeader: 'doctor' | 'admin',
    links: linksProps[],
}) => {
    return (
        <div className="w-full min-h-[100vh]">
            <div className="h-[10%]">
                <HeaderDashboard typeHeader={typeHeader} />
            </div>
            <div className="fixed h-full w-[18rem]">
                <Slider links={links} />
            </div>
            <div className="absolute w-[calc(100%-18rem)] h-[90%] bg-[#F8F9FD] right-0">
                <Outlet />
            </div>
        </div>
    );
}
export default DashboardLayout