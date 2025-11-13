import { useNavigate } from "react-router";
import BookAppointment from "../../components/BookAppointment";
import Card from "../../components/ui/Card";
import { doctorInformation, doctors } from "../../constants/data";
import { useEffect } from "react";
const AppointmentPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (false) {
            navigate('/ErrorNotFound');
        }
    }, [navigate]);
    return (
        <section className="my-10">
            <BookAppointment
                name={doctorInformation.name}
                specail={doctorInformation.specail}
                year_experince={doctorInformation.year_experince}
                about={doctorInformation.about}
                image={doctorInformation.image}
                fee={doctorInformation.fee}
            />
            <div className="my-20 flex flex-col items-center justify-center gap-5">
                <h1
                    className="font-bold text-2xl text-black font-nunito"
                >
                    Related Doctors
                </h1>
                <p
                    className="text-sm text-center font-nunito max-w-[100%] md:max-w-[40%]"
                >
                    Simply browse through our extensive list of trusted doctors.
                </p>
                <div className="grid md:grid-cols-4 gap-4 grid-cols-2">
                    {
                        doctors.map((doctor, index) => (
                            <Card
                                key={index}
                                available={doctor.available}
                                name={doctor.name}
                                specail={doctor.specail}
                                index={index}
                                image={doctor.image}
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    );
}
export default AppointmentPage;