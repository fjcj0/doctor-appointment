import Doctors from "../../components/Doctors";
import EndeSctionHome from "../../components/EndSectionHome";
import HeaderHome from "../../components/HeaderHome";
import Speiality from "../../components/Speciality";
const HomePage = () => {
    return (
        <section>
            <HeaderHome />
            <Speiality />
            <Doctors />
            <EndeSctionHome />
        </section>
    );
}
export default HomePage;