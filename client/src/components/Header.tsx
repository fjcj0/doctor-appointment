import { Link, useLocation } from "react-router-dom";
import { arrowDownIcon, headerLinks, userLogo } from "../constants/data";
import type { headerLinksProps } from "../global";
import { useState, useRef, useEffect } from "react";
import { userLinks } from "../constants/data";
import { motion } from 'framer-motion';
const Header = () => {
    const isAuth = false;
    const location = useLocation();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleLogout = () => {
        console.log("Logging out...");
        setIsOpen(false);
    };
    return (
        <motion.header
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-between w-full border-b-[0.3px] border-b-black px-2 py-2">
            <div className="flex items-center justify-center">
                <img src={'/logo.png'} className="w-16" alt="Logo" />
            </div>
            <div className="hidden md:flex items-start justify-start gap-6">
                {headerLinks.map((link: headerLinksProps) => {
                    const isActive = location.pathname === link.direct;
                    return (
                        <Link
                            key={link.direct}
                            to={link.direct}
                            className={`relative text-sm font-poppins transition-colors duration-300 group`}
                        >
                            {link.text}
                            <span
                                className={`absolute bottom-0 left-0 h-0.5 bg-blue-2 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                    }`}
                            ></span>
                        </Link>
                    );
                })}
            </div>
            {isAuth ? (
                <div className="flex items-center justify-center gap-2 relative" ref={dropdownRef}>
                    <div className="flex items-center justify-center gap-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                        <img src={userLogo} alt="User logo" className="w-11 h-11 rounded-full" />
                        <button type="button" className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                            <img src={arrowDownIcon} className="w-4 h-4" alt="Dropdown arrow" />
                        </button>
                    </div>
                    <div
                        className={`absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out z-50 ${isOpen
                            ? 'opacity-100 transform translate-y-0'
                            : 'opacity-0 transform -translate-y-2 pointer-events-none'
                            }`}
                    >
                        <div className="py-1">
                            {userLinks.map((link, index) => (
                                <div key={index}>
                                    {link.isButton ? (
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors duration-200 font-poppins"
                                        >
                                            {link.text}
                                        </button>
                                    ) : (
                                        <Link
                                            to={link.direct!}
                                            onClick={() => setIsOpen(false)}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 font-poppins"
                                        >
                                            {link.text}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <Link
                    to={'/create-account'}
                    className="bg-blue-2 hover:bg-blue-3 duration-300 transition-all text-white px-3 py-2 text-sm font-poppins rounded-3xl font-bold"
                >
                    Create Account
                </Link>
            )}
        </motion.header>
    );
};
export default Header;