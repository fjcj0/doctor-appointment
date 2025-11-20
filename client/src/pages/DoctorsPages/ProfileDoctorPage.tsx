import { useEffect, useState } from "react";
import Input from "../../components/ui/Input";
import { Edit } from "lucide-react";
import LoaderDashboard from "../../tools/LoaderDashboard";
import useDoctorStore from "../../store/DoctorStore";
import { uploadImage } from "../../utils/uploadImage";
import toast from "react-hot-toast";
import LoadingButton from "../../tools/LoadingButton";
type Specialization = 'General Physician' | 'Cardiologist' | 'Neurologist' | 'Pediatrician' | 'Orthopedic Surgeon' | 'Dermatologist';
const ProfileDoctorPage = () => {
    const { doctor, isLoading, updateDoctor } = useDoctorStore();
    const [name, setName] = useState(doctor?.name || "");
    const [graduation, setGraduation] = useState(doctor?.degree || "");
    const [specialization, setSpecialization] = useState<Specialization | "">(doctor?.speciality as Specialization || "");
    const [about, setAbout] = useState(doctor?.about || "");
    const [experienceYears, setExperienceYears] = useState(doctor?.experience || "");
    const [fee, setFee] = useState<string>(doctor?.fees?.toString() || "");
    const [address, setAddress] = useState(doctor?.address || "");
    const [isAvailable, setIsAvailable] = useState(doctor?.available || false);
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [profilePicture, setProfilePicture] = useState<string>(doctor?.profilePicture || "");
    const [isChoosingPicture, setIsChoosingPicture] = useState(false);
    const specializations: Specialization[] = [
        'General Physician', 'Cardiologist', 'Neurologist', 'Pediatrician', 'Orthopedic Surgeon', 'Dermatologist'
    ];
    const experiences = ['1 Year', '2 Years', '3 Years', '4 Years', '5 Years', '6 Years', '7 Years', '8 Years', '9 Years', '10+ Years'];
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoadingPage(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const toastId = toast.loading('Wait uploading new picture');
        setIsChoosingPicture(true);
        const file = event.target.files?.[0];
        if (file) {
            try {
                const picture = await uploadImage(file);
                if (picture && typeof picture === 'string') {
                    setProfilePicture(picture);
                    toast.success('Profile picture updated successfully!');
                } else {
                    throw new Error('Failed to upload image');
                }
            } catch (error) {
                toast.error(error instanceof Error ? error.message : 'Failed to upload image');
            }
        }
        setIsChoosingPicture(false);
        toast.dismiss(toastId);
    };
    const handleUpdateProfile = async () => {
        try {
            const feeNumber = fee ? parseFloat(fee) : 0;
            await updateDoctor(
                name || "",
                specialization || "",
                graduation || "",
                address || "",
                profilePicture || "",
                experienceYears || "",
                feeNumber,
                about || "",
                isAvailable
            );
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            toast.error(errorMessage);
            console.error(error);
        }
    };
    const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setFee(value);
        }
    };
    useEffect(() => {
        return () => {
            if (profilePicture && profilePicture.startsWith('blob:')) {
                URL.revokeObjectURL(profilePicture);
            }
        };
    }, [profilePicture]);
    if (isLoadingPage) {
        return <LoaderDashboard />;
    }
    return (
        <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
                <div className="md:col-span-2">
                    <input
                        type="file"
                        id="profile-picture-input"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={isChoosingPicture}
                    />
                    <label htmlFor="profile-picture-input" className="cursor-pointer">
                        <div className="relative flex items-center justify-center bg-blue-2/55 hover:bg-blue-2 rounded-xl duration-300 transition-all min-h-[200px]">
                            {profilePicture ? (
                                <img
                                    src={profilePicture}
                                    alt="Profile"
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            ) : (
                                <div className="text-white text-center p-4">
                                    <p>{isChoosingPicture ? 'Uploading...' : 'Click to upload profile picture'}</p>
                                </div>
                            )}
                            <div className="absolute top-1 right-1 bg-black/50 rounded-full p-1">
                                <Edit size={20} color='white' />
                            </div>
                        </div>
                    </label>
                </div>
                <div className="md:col-span-5 bg-blue-1 p-3 rounded-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <select
                            value={experienceYears}
                            onChange={(e) => setExperienceYears(e.target.value)}
                            className="w-full px-4 pt-5 pb-2 font-nunito text-xs text-black focus:text-blue-2 rounded-lg border-[0.5px] border-gray-400 focus:border-blue-2 bg-white"
                        >
                            <option value="">Select Experience</option>
                            {experiences.map((exp, index) => (
                                <option key={index} value={exp}>
                                    {exp}
                                </option>
                            ))}
                        </select>
                        <Input
                            placeholder="Consultation Fee"
                            onChange={handleFeeChange}
                            value={fee}
                            type="text"
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
                            onChange={(e) => setSpecialization(e.target.value as Specialization)}
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
                        <button
                            disabled={isLoading || isChoosingPicture}
                            type="button"
                            onClick={handleUpdateProfile}
                            className={`px-8 font-nunito font-bold py-2 rounded-2xl text-black bg-purple-1 border-[0.5px] border-gray-300 hover:bg-purple-2 hover:text-white duration-300 transition-all ${(isLoading || isChoosingPicture) && 'opacity-50 cursor-not-allowed'}`}
                        >
                            {isLoading ? <LoadingButton color="blue-500" /> : 'Update Profile'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProfileDoctorPage;