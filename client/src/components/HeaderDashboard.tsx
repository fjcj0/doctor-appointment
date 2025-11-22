import { filterIcon, logo } from "../constants/data";
import useAdminStore from "../store/AdminStore";
import useDoctorStore from "../store/DoctorStore";
import useSlideStore from "../store/SlideStore";
const HeaderDashboard = ({ typeHeader }: {
    typeHeader: 'doctor' | 'admin'
}) => {
    const { toggleSlide } = useSlideStore();
    const { logoutDoctor } = useDoctorStore();
    const { logoutAdmin } = useAdminStore();
    const handleLogout = async () => {
        if (typeHeader === 'doctor') {
            try {
                await logoutDoctor();
            } catch (error) {
                console.log(error instanceof Error ? error.message : error);
            }
        } else {
            try {
                await logoutAdmin();
            } catch (error) {
                console.log(error instanceof Error ? error.message : error);
            }
        }
    }
    return (
        <header className="fixed z-50 bg-white w-full flex justify-between items-center border-b-[1px] border-r-gray-300">
            <img src={logo} className="w-20 ml-5" />
            <div className="flex gap-3 mr-5">
                <button
                    onClick={handleLogout}
                    type="button" className="px-8 font-nunito font-bold py-2 rounded-2xl text-black bg-purple-1 border-[0.5px] border-gray-300 hover:bg-purple-2 hover:text-white duration-300 transition-all">
                    logout
                </button>
                <button type="button" className="block" onClick={toggleSlide}>
                    <img src={filterIcon} className="w-5" alt="Menu" />
                </button>
            </div>
        </header>
    );
}
export default HeaderDashboard;