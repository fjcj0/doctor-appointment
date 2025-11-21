import { useEffect, useRef, useState } from "react";
import Input from "../../components/ui/Input";
import { Edit } from "lucide-react";
import LoaderDashboard from "../../tools/LoaderDashboard";
import useAdminStore from "../../store/AdminStore";
import { uploadImage } from "../../utils/uploadImage";
import toast from "react-hot-toast";
import LoadingButton from "../../tools/LoadingButton";
const AdminProfilePage = () => {
    const { admin, isLoading, updateAdmin } = useAdminStore();
    const [name, setName] = useState<string>(admin?.name || '');
    const [email, setEmail] = useState<string>(admin?.email || '');
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [profilePicture, setProfilePicture] = useState<string>(admin?.profilePicture || '');
    const fileInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoadingPage(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    const handleEditPictureClick = () => {
        fileInputRef.current?.click();
    }
    const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const toastId = toast.loading('Wait uploading picture...');
        try {
            const files = e.target.files;
            if (!files || files.length === 0) return;
            const file = files[0];
            const imageUrl = await uploadImage(file);
            if (imageUrl) {
                setProfilePicture(imageUrl);
            }
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        } finally {
            toast.dismiss(toastId);
        }
    }
    if (isLoadingPage) {
        return <LoaderDashboard />;
    }
    const onUpdate = async () => {
        try {
            await updateAdmin(name, profilePicture);;
        } catch (error) {
            console.log(error instanceof Error ? error.message : error);
        }
    }
    return (
        <div className="p-5">
            <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleChangeFile}
                accept="image/*"
            />
            <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
                <div className="md:col-span-2">
                    <button
                        type="button"
                        className="relative flex items-center justify-center rounded-xl duration-300 transition-all w-full"
                        onClick={handleEditPictureClick}
                    >
                        <img
                            src={profilePicture}
                            alt="Admin Profile"
                            className="w-full h-auto rounded-xl"
                        />
                        <div className="absolute top-1 right-1">
                            <Edit size={20} color='white' />
                        </div>
                    </button>
                </div>
                <div className="md:col-span-5 rounded-xl">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex flex-col p-3 rounded-3xl gap-3 bg-blue-1">
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
                                isDisabled={true}
                            />
                            <div className="mt-4">
                                <button
                                    onClick={onUpdate}
                                    type="button"
                                    disabled={isLoading}
                                    className={`px-8 font-nunito font-bold py-2 rounded-2xl text-black bg-purple-1 border-[0.5px] border-gray-300 hover:bg-purple-2 hover:text-white duration-300 transition-all ${isLoading && 'opacity-50'}`}
                                >
                                    {isLoading ? <LoadingButton color="blue-500" /> : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AdminProfilePage;