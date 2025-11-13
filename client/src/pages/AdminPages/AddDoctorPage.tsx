import { useEffect, useState } from "react";
import Input from "../../components/ui/Input";
import { Edit, Upload } from "lucide-react";
import LoaderDashboard from "../../tools/LoaderDashboard";
const AddDoctorPage = () => {
    const [name, setName] = useState<string>("");
    const [graduation, setGraduation] = useState<string>("");
    const [specialization, setSpecialization] = useState<string>("");
    const [about, setAbout] = useState<string>("");
    const [experienceYears, setExperienceYears] = useState<string>("");
    const [fee, setFee] = useState<string>("");
    const [firstAddress, setFirstAddress] = useState<string>("");
    const [secondAddress, setSecondAddress] = useState<string>("");
    const [image, setImage] = useState<string | null>(null);
    const specializations: string[] = [
        "Cardiology",
        "Dermatology",
        "Neurology",
        "Pediatrics",
        "Orthopedics",
        "Gynecology",
        "Psychiatry",
        "Endocrinology",
        "Gastroenterology",
        "Ophthalmology",
        "Radiology",
        "Surgery",
        "Internal Medicine",
        "Emergency Medicine",
        "Family Medicine",
        "Anesthesiology",
        "Pathology",
        "Oncology",
        "Urology",
        "ENT"
    ];
    const handleImageChange = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const doctorData = {
            name,
            graduation,
            specialization,
            about,
            experienceYears,
            fee,
            firstAddress,
            secondAddress,
            image
        };
        console.log("Doctor data:", doctorData);
    };
    const handleClear = () => {
        setName("");
        setGraduation("");
        setSpecialization("");
        setAbout("");
        setExperienceYears("");
        setFee("");
        setFirstAddress("");
        setSecondAddress("");
        setImage(null);
    };
    const [isLoading, setIsLoading] = useState(true);
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
                            <Input
                                placeholder="Years of Experience"
                                onChange={(e) => setExperienceYears(e.target.value)}
                                value={experienceYears}
                                type="number"
                            />
                            <Input
                                placeholder="Consultation Fee"
                                onChange={(e) => setFee(e.target.value)}
                                value={fee}
                                type="number"
                            />
                            <Input
                                placeholder="Primary Address"
                                onChange={(e) => setFirstAddress(e.target.value)}
                                value={firstAddress}
                                type="text"
                            />
                            <Input
                                placeholder="Secondary Address"
                                onChange={(e) => setSecondAddress(e.target.value)}
                                value={secondAddress}
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col mt-4">

                            <select
                                value={specialization}
                                onChange={(e) => setSpecialization(e.target.value)}
                                className="w-full px-4 py-2 font-nunito text-xs text-black focus:text-blue-2 rounded-lg border-[0.5px] border-gray-400 focus:border-blue-2 bg-white"
                                required
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
                                className="px-8 font-nunito font-bold py-2 rounded-2xl text-white bg-blue-2 border-[0.5px] border-blue-2 hover:bg-blue-700 duration-300 transition-all"
                            >
                                Add Doctor
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