import { useEffect, useState, useMemo } from "react";
import Card from "../../components/ui/Card";
import LoaderDashboard from "../../tools/LoaderDashboard";
import useScreenStore from "../../store/ScreenStore";
const DoctorsListPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { getDoctorsScreen, doctorsScreen } = useScreenStore();
    const [searchTerm, setSearchTerm] = useState("");
    const filteredDoctors = useMemo(() => {
        if (!searchTerm.trim()) {
            return doctorsScreen;
        }
        const lowercasedSearch = searchTerm.toLowerCase();
        return doctorsScreen.filter(doctor =>
            doctor.name?.toLowerCase().includes(lowercasedSearch) ||
            doctor.speciality?.toLowerCase().includes(lowercasedSearch)
        );
    }, [doctorsScreen, searchTerm]);
    useEffect(() => {
        const GetDoctors = async () => {
            try {
                setIsLoading(true);
                await getDoctorsScreen();
            } catch (error: unknown) {
                console.log(error instanceof Error ? error.message : error);
            } finally {
                setIsLoading(false);
            }
        }
        GetDoctors();
    }, []);
    if (isLoading) {
        return <LoaderDashboard />;
    }
    return (
        <div className="p-5">
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search doctors by name or specialty..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg 
                             text-black placeholder-gray-500
                             focus:outline-none focus:border-blue-500 focus:text-blue-500
                             transition-colors duration-200"
                />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-3'>
                {filteredDoctors.map((doctor, index) => (
                    <Card
                        key={doctor._id || index}
                        id={doctor._id}
                        name={doctor.name}
                        profilePicture={doctor.profilePicture}
                        available={doctor?.available}
                        specialtiy={doctor.speciality}
                        index={index}
                        isCheckAble={true}
                        isForAdmin={true}
                    />
                ))}
            </div>
            {filteredDoctors.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    {doctorsScreen.length === 0
                        ? "No doctors available."
                        : "No doctors found matching your search."
                    }
                </div>
            )}
        </div>
    );
}
export default DoctorsListPage;