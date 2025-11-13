import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import { doctors } from "../../constants/data";
import LoaderDashboard from "../../tools/LoaderDashboard";
const DoctorsListPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredDoctors, setFilteredDoctors] = useState(doctors);
    const onChangeCheck = async () => {

    }
    useEffect(() => {
        const filtered = doctors.filter(doctor =>
            doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.specail.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredDoctors(filtered);
    }, [searchTerm]);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
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
                        key={index}
                        name={doctor.name}
                        image={doctor.image}
                        available={doctor.available}
                        specail={doctor.specail}
                        index={index}
                        isCheckAble={true}
                        onChnageCheck={onChangeCheck}
                    />
                ))}
            </div>
            {filteredDoctors.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No doctors found matching your search.
                </div>
            )}
        </div>
    );
}
export default DoctorsListPage;