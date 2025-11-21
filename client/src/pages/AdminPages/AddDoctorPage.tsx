import { useEffect, useState } from "react";
import Input from "../../components/ui/Input";
import { Edit, Upload } from "lucide-react";
import LoaderDashboard from "../../tools/LoaderDashboard";
import toast from "react-hot-toast";
import { uploadImage } from "../../utils/uploadImage";
import useAdminStore from "../../store/AdminStore";
import LoadingButton from "../../tools/LoadingButton";
type Specialization = 'General Physician' | 'Cardiologist' | 'Neurologist' | 'Pediatrician' | 'Orthopedic Surgeon' | 'Dermatologist';
const AddDoctorPage = () => {
    const { isLoading, createDoctor } = useAdminStore();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [graduation, setGraduation] = useState<string>("");
    const [specialization, setSpecialization] = useState<string>("");
    const [about, setAbout] = useState<string>("");
    const [experienceYears, setExperienceYears] = useState<string>("");
    const [fee, setFee] = useState<number | null | ''>(null);
    const [primaryAddress, setPrimaryAddress] = useState<string>("");
    const [image, setImage] = useState<string | null>(null);
    const specializations: Specialization[] = [
        'General Physician', 'Cardiologist', 'Neurologist', 'Pediatrician', 'Orthopedic Surgeon', 'Dermatologist'
    ];
    const experiences = ['1 Year', '2 Years', '3 Years', '4 Years', '5 Years', '6 Years', '7 Years', '8 Years', '9 Years', '10+ Years'];
    const handleImageChange = async (e: any) => {
        const toastId = toast.loading('Wait uploading image....');
        const file = e.target.files?.[0];
        if (file) {
            try {
                const imageUrl = await uploadImage(file);
                if (imageUrl && typeof imageUrl === 'string') {
                    setImage(imageUrl);
                }
            } catch (error) {
                console.log(error instanceof Error ? error.message : error);
            } finally {
                toast.dismiss(toastId);
            }
        }
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await createDoctor(name, email, password, specialization, graduation, primaryAddress, image || '', experienceYears, fee || 0, about);
            handleClear();
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        }
    };
    const handleClear = () => {
        setName("");
        setGraduation("");
        setSpecialization("");
        setAbout("");
        setExperienceYears("");
        setFee('');
        setPrimaryAddress("");
        setImage(null);
        setEmail("");
        setPassword("");
    };
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoadingPage(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    if (isLoadingPage) {
        return <LoaderDashboard />;
    }
    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold text-black mb-6">Add New Doctor</h1>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
                    <div className="md:col-span-2">
                        <div className="bg-blue-1/20 p-4 rounded-xl">
                            <label className="relative flex flex-col items-center justify-center bg-blue-2/55 hover:bg-blue-2 rounded-xl duration-300 transition-all cursor-pointer min-h-[200px] border-[1px] border-gray-400">
                                {image ? (
                                    <>
                                        <img
                                            src={image}
                                            alt="Doctor preview"
                                            className="w-full h-full object-cover rounded-xl"
                                        />
                                        <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1">
                                            <Edit size={16} color='white' />
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center p-4">
                                        <div className="mx-auto w-12 h-12 bg-blue-2/20 rounded-full flex items-center justify-center mb-2">
                                            <Upload size={24} color='white' />
                                        </div>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="md:col-span-5 bg-blue-1 p-6 rounded-xl">
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
                                placeholder="Primary Address"
                                onChange={(e) => setPrimaryAddress(e.target.value)}
                                value={primaryAddress}
                                type="text"
                            />
                            <Input
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="text"
                            />
                            <Input
                                placeholder="Consultation Fee"
                                onChange={(e) => setFee(e.target.value)}
                                value={fee}
                                type="number"
                            />
                        </div>
                        <div className="flex flex-col mt-4">
                            <Input
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
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
                                placeholder="Enter doctor's background, qualifications, and expertise..."
                                onChange={(e) => setAbout(e.target.value)}
                                value={about}
                                rows={4}
                                className="w-full px-4 py-2 font-nunito text-xs text-black focus:text-blue-2 rounded-lg border-[0.5px] border-gray-400 focus:border-blue-2 resize-none"
                                required
                            />
                        </div>
                        <div className="mt-6 flex gap-3">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`px-8 font-nunito font-bold py-2 rounded-2xl text-white bg-blue-2 border-[0.5px] border-blue-2 hover:bg-blue-700 duration-300 transition-all ${isLoading && 'opacity-50'}`}
                            >
                                {isLoading ? <LoadingButton color="blue-500" /> : 'Add Doctor'}
                            </button>
                            <button
                                type="button"
                                className="px-8 font-nunito font-bold py-2 rounded-2xl text-gray-700 bg-gray-200 border-[0.5px] border-gray-300 hover:bg-gray-300 duration-300 transition-all"
                                onClick={handleClear}
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default AddDoctorPage;