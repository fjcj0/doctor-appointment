import { useEffect, useState } from "react";
import Input from "../../components/ui/Input";
import { Edit } from "lucide-react";
import LoaderDashboard from "../../tools/LoaderDashboard";
const AdminProfilePage = () => {
    const [name, setName] = useState("Omar Coding");
    const [email, setEmail] = useState("omarcoding@gmail.com");
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
            <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
                <div className="md:col-span-2">
                    <button
                        type="button"
                        className="relative flex items-center justify-center bg-blue-2/55 hover:bg-blue-2 rounded-xl duration-300 transition-all w-full"
                    >
                        <img
                            src={'https://res.cloudinary.com/djovbiyia/image/upload/v1762023281/users/o9ycx2djcxgnwitqklhm.jpg'}
                            alt="Admin Profile"
                            className="w-full h-auto rounded-xl"
                        />
                        <div className="absolute top-1 right-1">
                            <Edit size={20} color='white' />
                        </div>
                    </button>
                </div>
                <div className="md:col-span-5 bg-blue-1 p-3 rounded-xl">
                    <div className="grid grid-cols-1 gap-4">
                        <Input
                            placeholder="Full Name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                        />
                        <Input
                            placeholder="Email Address"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                        />
                    </div>
                    <div className="mt-4">
                        <button
                            type="button"
                            className="px-8 font-nunito font-bold py-2 rounded-2xl text-black bg-purple-1 border-[0.5px] border-gray-300 hover:bg-purple-2 hover:text-white duration-300 transition-all"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AdminProfilePage;