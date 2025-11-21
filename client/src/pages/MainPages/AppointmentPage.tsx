import { useNavigate } from "react-router-dom";
import BookAppointment from "../../components/BookAppointment";
import Card from "../../components/ui/Card";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import useScreenStore from "../../store/ScreenStore";
import toast from "react-hot-toast";
import LoaderMainScreen from "../../tools/LoaderMainScreen";
const AppointmentPage = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingRelated, setIsLoadingRelated] = useState(false);
    const { relatedDoctors, getRelatedDoctors, getDoctor, doctor } = useScreenStore();
    const navigate = useNavigate();
    const hasLoadedRelated = useRef(false);
    if (!id) {
        navigate('/ErrorNotFound');
        return null;
    }
    useEffect(() => {
        const handleData = async () => {
            setIsLoading(true);
            try {
                await getDoctor(id);
            } catch (error: unknown) {
                toast.error(error instanceof Error ? error.message : String(error));
            } finally {
                setIsLoading(false);
            }
        };
        handleData();
    }, [id]);
    useEffect(() => {
        if (doctor?.speciality && doctor?.name && !hasLoadedRelated.current) {
            const loadRelatedDoctors = async () => {
                setIsLoadingRelated(true);
                try {
                    await getRelatedDoctors(doctor.speciality, doctor.name);
                    hasLoadedRelated.current = true; // Mark as loaded
                } catch (error: unknown) {
                    console.error("Failed to load related doctors:", error);
                } finally {
                    setIsLoadingRelated(false);
                }
            };
            loadRelatedDoctors();
        }
    }, [doctor?.speciality, doctor?.name, getRelatedDoctors]);
    if (isLoading) {
        return <LoaderMainScreen />;
    }
    if (!doctor) {
        navigate('/ErrorNotFound');
        return null;
    }
    return (
        <section className="my-10">
            <BookAppointment
                doctorId={doctor._id}
                name={doctor.name}
                specail={doctor.speciality}
                year_experince={doctor.experience}
                about={doctor.about}
                image={doctor.profilePicture}
                fees={doctor.fees}
                degree={doctor.degree}
            />
            <div className="my-20 flex flex-col items-center justify-center gap-5">
                <h1 className="font-bold text-2xl text-black font-nunito">
                    Related Doctors
                </h1>
                <p className="text-sm text-center font-nunito max-w-[100%] md:max-w-[40%]">
                    Simply browse through our extensive list of trusted doctors.
                </p>
                <div className="grid md:grid-cols-4 gap-4 grid-cols-2">
                    {isLoadingRelated ? (
                        <p className="col-span-full text-center">Loading related doctors...</p>
                    ) : relatedDoctors.length > 0 ? (
                        relatedDoctors.map((doctor, index) => (
                            <Card
                                id={doctor?._id}
                                key={doctor?._id || index}
                                available={doctor.available}
                                name={doctor.name}
                                specialtiy={doctor.speciality}
                                index={index}
                                profilePicture={doctor.profilePicture}
                                isForAdmin={false}
                            />
                        ))
                    ) : (
                        <p className="col-span-full text-center">No related doctors found.</p>
                    )}
                </div>
            </div>
        </section>
    );
}
export default AppointmentPage;