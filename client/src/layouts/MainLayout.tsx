import Footer from "../components/Footer";
import Header from "../components/Header";
import MaxmiddleWidthScreen from "../tools/MaxmiddleWidthScreen";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
    return (
        <MaxmiddleWidthScreen>
            <Header />
            <Outlet />
            <Footer />
        </MaxmiddleWidthScreen>
    );
}
export default MainLayout;