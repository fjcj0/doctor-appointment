import { Link } from "react-router";
import { footerLinks, logo } from "../constants/data";
import type { headerLinksProps } from "../global";
const Footer = () => {
    return (
        <footer className="w-full flex flex-col ">
            <div className="w-full grid grid-cols-2 md:grid-cols-3 p-3 border-b-[0.3px]  border-black">
                <div className="flex flex-col items-start justify-start gap-y-3">
                    <img src={logo} className="w-20 bg-green-500/30 hover:bg-green-500/80 duration-300 transition-all rounded-lg" />
                    <p className="text-xs font-poppins md:max-w-[90%]">
                        HealthCore is dedicated to providing comprehensive healthcare solutions and medical services. Our mission is to deliver exceptional patient care through innovative technology and experienced medical professionals
                    </p>
                </div>
                <div className="flex flex-col items-start font-poppins justify-start gap-y-3">
                    <h1>{footerLinks.company.title}</h1>
                    <div className="flex flex-col items-start justify-start gap-y-1">
                        {footerLinks.company.links.map((link: headerLinksProps) => (
                            <Link key={link.direct} to={link.direct} className="font-light hover:underline duration-300 transition-all text-sm">
                                {link.text}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col items-start font-poppins justify-start gap-y-3">
                    <h1>{footerLinks.GET_IN_TOUCH.title}</h1>
                    <div className="flex flex-col items-start justify-start gap-y-1">
                        {footerLinks.GET_IN_TOUCH.lists.map((list) => (
                            <p key={list.text} className="font-light text-sm">
                                {list.text}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center my-2 font-poppins text-xs">
                <p>&copy; {new Date().getFullYear()} HealthCore. All rights reserved</p>
            </div>
        </footer>
    );
}
export default Footer;