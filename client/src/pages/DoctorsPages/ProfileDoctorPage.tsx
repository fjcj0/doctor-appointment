import { useEffect, useState } from "react";
import Input from "../../components/ui/Input";
import { Edit } from "lucide-react";
import LoaderDashboard from "../../tools/LoaderDashboard";
import useDoctorStore from "../../store/DoctorStore";
type Specialization = 'General Physician' | 'Cardiologist' | 'Neurologist' | 'Pediatrician' | 'Orthopedic Surgeon' | 'Dermatologist';
const ProfileDoctorPage = () => {
    const { doctor } = useDoctorStore();
    const [name, setName] = useState(doctor?.name);
    const [graduation, setGraduation] = useState(doctor?.degree);
    const [specialization, setSpecialization] = useState<Specialization | undefined>(doctor?.speciality as Specialization | undefined);
    const [about, setAbout] = useState(doctor?.about);
    const [experienceYears, setExperienceYears] = useState(doctor?.experience);
    const [fee, setFee] = useState(doctor?.fees);
    const [address, setAddress] = useState(doctor?.address);
    const [isAvailable, setIsAvailable] = useState(doctor?.available);
    const [isLoading, setIsLoading] = useState(true);
    const specializations: Specialization[] = [
        'General Physician', 'Cardiologist', 'Neurologist', 'Pediatrician', 'Orthopedic Surgeon', 'Dermatologist'
    ];
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
            <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
                <div className="md:col-span-2">
                    <button type="button" className="relative flex items-center justify-center bg-blue-2/55 hover:bg-blue-2 rounded-xl duration-300 transition-all">
                        <img src={doctor?.profilePicture} />
                        <div className="absolute top-1 right-1">
                            <Edit size={20} color='white' />
                        </div>
                    </button>
                </div>
                <div className="md:col-span-5 bg-blue-1 p-3 rounded-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                        <Input
                            placeholder="Full Name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                        />
                        <Input
                            placeholder="Graduation"
                            onChange={(e) => setGraduation(e.target.value)}
                            value={graduation}
                            type="text"
                        />
                        <Input
                            placeholder="Years of Experience"
                            onChange={(e) => setExperienceYears(e.target.value)}
                            value={experienceYears}
                            type="text"
                        />
                        <Input
                            placeholder="Consultation Fee"
                            onChange={(e) => setFee(e.target.value)}
                            value={fee}
                            type="number"
                        />
                    </div>
                    <div className="flex flex-col mt-3">
                        <Input
                            placeholder="Primary Address"
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                            type="text"
                        />
                        <select
                            value={specialization}
                            onChange={(e) => {
                                setSpecialization(e.target.value as Specialization)
                            }}
                            className="w-full px-4 py-2 mt-3 font-nunito text-xs text-black focus:text-blue-2 rounded-lg border-[0.5px] border-gray-400 focus:border-blue-2 bg-white"
                        >
                            <option value="">Select Specialization</option>
                            {specializations.map((spec) => (
                                <option key={spec} value={spec}>
                                    {spec}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            About
                        </label>
                        <textarea
                            placeholder="About the doctor"
                            onChange={(e) => setAbout(e.target.value)}
                            value={about}
                            rows={4}
                            className="w-full px-4 py-2 font-nunito text-xs text-black focus:text-blue-2 rounded-lg border-[0.5px] border-gray-400 focus:border-blue-2 resize-none"
                        />
                    </div>
                    <div className="mt-4 flex items-center">
                        <input
                            type="checkbox"
                            id="availability"
                            checked={isAvailable}
                            onChange={(e) => setIsAvailable(e.target.checked)}
                            className="h-4 w-4 text-blue-2 focus:ring-blue-2 border-gray-300 rounded"
                        />
                        <label htmlFor="availability" className="ml-2 block text-sm text-gray-900">
                            Available
                        </label>
                    </div>
                    <div className="mt-3">
                        <button type="button" className="px-8 font-nunito font-bold py-2 rounded-2xl text-black bg-purple-1 border-[0.5px] border-gray-300 hover:bg-purple-2 hover:text-white duration-300 transition-all">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProfileDoctorPage;