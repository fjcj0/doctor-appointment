import { XIcon } from "lucide-react";
import { headerLinks, logo } from "../constants/data";
import { Link, useLocation } from "react-router-dom";
import useHeaderStore from "../store/HeaderStore";
import { motion, AnimatePresence } from 'framer-motion';
const ListsHeaderLinks = () => {
    const location = useLocation();
    const { isHeaderSlideOpen, closeHeaderSlide } = useHeaderStore();
    return (
        <AnimatePresence>
            {isHeaderSlideOpen && (
                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 0.3 }}
                    className={`min-h-[100vh] z-30 w-screen fixed top-0 right-0 p-5 flex flex-col bg-white`}
                >
                    <div className="flex items-center justify-between">
                        <img src={logo} className="w-20" alt="Logo" />
                        <button type="button" onClick={closeHeaderSlide}>
                            <XIcon />
                        </button>
                    </div>
                    <div className="my-10 flex flex-col items-center justify-center gap-3 font-nunito">
                        {headerLinks.map((headerLink, index) => {
                            const isActive = location.pathname === headerLink.direct;
                            return (
                                <Link
                                    onClick={closeHeaderSlide}
                                    key={index}
                                    to={headerLink.direct}
                                    className={`text-black font-bold hover:bg-purple-2 px-3 py-2 rounded-xl duration-300 ${isActive && 'bg-purple-2'
                                        }`}
                                >
                                    {headerLink.text}
                                </Link>
                            );
                        })}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
export default ListsHeaderLinks;