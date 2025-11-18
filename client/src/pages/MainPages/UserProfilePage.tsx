import { useState, useEffect, useRef } from "react";
import FloatInput from "../../components/ui/FloatInput";
import useUserStore from "../../store/UserStore";
import { uploadImage } from "../../utils/uploadImage";
import { Edit } from "lucide-react";
const UserProfilePage = () => {
    const { user, updateProfile } = useUserStore();
    const [isEdit, setIsEdit] = useState(false);
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [errorName, setErrorName] = useState('');
    const [errorPhone, setErrorPhone] = useState('');
    const [address, setAddress] = useState('');
    const [errorAddress, setErrorAddress] = useState('');
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setPhone(user.phone || '');
            setAddress(user.address || '');
            setGender(user.gender || '');
            setBirthday(user.birthday || '');
            setProfilePicture(user.profilePicture || '');
        }
    }, [user]);
    const handleImageClick = () => {
        if (isEdit && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            setUploadError('Please select a valid image file');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setUploadError('Image size should be less than 5MB');
            return;
        }
        setIsUploading(true);
        setUploadError('');
        try {
            const imageUrl = await uploadImage(file);
            setProfilePicture(imageUrl);
        } catch (error: unknown) {
            setUploadError('Failed to upload image. Please try again.');
            console.error('Image upload error:', error);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };
    const handleNameChange = (value: string) => {
        setName(value);
        if (errorName && value.length >= 4) {
            setErrorName('');
        }
    };
    const handlePhoneChange = (value: string) => {
        setPhone(value);
        if (errorPhone) {
            setErrorPhone('');
        }
    };
    const handleAddressChange = (value: string) => {
        setAddress(value);
        if (errorAddress) {
            setErrorAddress('');
        }
    };
    const validateForm = (): boolean => {
        let isValid = true;
        if (name.length < 4) {
            setErrorName("Name must be at least 4 characters");
            isValid = false;
        } else {
            setErrorName('');
        }
        if (address && address.length < 5) {
            setErrorAddress("Address must be at least 5 characters");
            isValid = false;
        } else {
            setErrorAddress('');
        }
        return isValid;
    };
    const handleSaveChanges = async () => {
        if (!validateForm()) {
            return;
        }
        try {
            await updateProfile(name, profilePicture, birthday, gender, address, phone);
            setIsEdit(false);
        } catch (error: unknown) {
            console.log(error instanceof Error ? error.message : error);
        }
    };
    const handleEditProfile = () => {
        setIsEdit(true);
    };
    const handleCancelEdit = () => {
        if (user) {
            setName(user.name || '');
            setPhone(user.phone || '');
            setAddress(user.address || '');
            setGender(user.gender || '');
            setBirthday(user.birthday || '');
            setProfilePicture(user.profilePicture || '');
        }
        setErrorName('');
        setErrorPhone('');
        setErrorAddress('');
        setUploadError('');
        setIsEdit(false);
    };
    return (
        <section className="my-10 font-nunito">
            <div className="flex flex-col items-start justify-start gap-5">
                <div className="w-full max-w-[40rem] flex flex-col gap-2 items-start justify-start">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                    />
                    <div className="flex flex-col items-start gap-2">
                        {
                            !isEdit ? (
                                <img
                                    src={profilePicture || user?.profilePicture}
                                    className="w-32 h-32 rounded-full object-cover"
                                    alt="User profile"
                                />
                            ) : (
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={handleImageClick}
                                        disabled={isUploading}
                                        className="relative group"
                                    >
                                        <img
                                            src={profilePicture || user?.profilePicture}
                                            className="w-32 h-32 rounded-full object-cover group-hover:opacity-70 transition-opacity"
                                            alt="User profile"
                                        />
                                        {isUploading && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                            </div>
                                        )}
                                        {!isUploading && isEdit && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-full">
                                                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Edit />
                                                </span>
                                            </div>
                                        )}
                                    </button>
                                </div>
                            )
                        }
                        {isEdit && uploadError && (
                            <p className="text-red-500 text-sm mt-1">{uploadError}</p>
                        )}
                        {isEdit && isUploading && (
                            <p className="text-blue-500 text-sm mt-1">Uploading image...</p>
                        )}
                    </div>
                    {
                        !isEdit ? (
                            <h1 className="text-2xl font-bold">{user?.name}</h1>
                        ) : (
                            <div className="w-full">
                                <FloatInput
                                    value={name}
                                    setValue={handleNameChange}
                                    error={errorName}
                                    isPassword={false}
                                    type="text"
                                    label="Name"
                                />
                            </div>
                        )
                    }
                </div>
                <div className="flex flex-col gap-2 items-start justify-start w-full max-w-[40rem]">
                    <span className="text-center px-4 py-2 rounded-full text-purple-2 mb-3 bg-purple-2/15 font-bold">
                        Contact Information
                    </span>
                    <div className="flex gap-10 items-start justify-start w-full">
                        <p className="min-w-[80px]">Email:</p>
                        <p>{user?.email}</p>
                    </div>
                    <div className="flex gap-10 items-start justify-start w-full">
                        <p className="min-w-[80px] pt-7">Phone:</p>
                        {
                            !isEdit ? (
                                <p className="pt-7">{user?.phone ? user?.phone : 'N/A'}</p>
                            ) : (
                                <div className="flex-1">
                                    <FloatInput
                                        value={phone}
                                        setValue={handlePhoneChange}
                                        error={errorPhone}
                                        isPassword={false}
                                        type="tel"
                                        label="Phone"
                                    />
                                </div>
                            )
                        }
                    </div>
                    <div className="flex gap-10 items-start justify-start w-full">
                        <p className="min-w-[80px] pt-7 pr-4">Address:</p>
                        {
                            !isEdit ? (
                                <p className="pt-7">{user?.address ? user?.address : 'N/A'}</p>
                            ) : (
                                <div className="flex-1">
                                    <FloatInput
                                        value={address}
                                        setValue={handleAddressChange}
                                        error={errorAddress}
                                        isPassword={false}
                                        type="text"
                                        label="Address"
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-2 items-start justify-start w-full max-w-[40rem]">
                    <span className="text-center px-4 py-2 rounded-full text-purple-2 mb-3 bg-purple-2/15 font-bold">
                        Basic Information
                    </span>
                    <div className="flex gap-10 items-start justify-start w-full">
                        <p className="min-w-[80px] pt-4">Gender:</p>
                        {
                            !isEdit ? (
                                <p className="pt-4">{user?.gender || 'N/A'}</p>
                            ) : (
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="border-b-2 border-black outline-none p-2 bg-transparent"
                                >
                                    <option value="" disabled={true}>Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            )
                        }
                    </div>
                    <div className="flex gap-10 items-start justify-start w-full">
                        <p className="min-w-[80px] pt-4">BirthDay:</p>
                        {
                            !isEdit ? (
                                <p className="pt-4">{user?.birthday ? user.birthday : 'N/A'}</p>
                            ) : (
                                <input
                                    type="date"
                                    value={birthday}
                                    onChange={(e) => setBirthday(e.target.value)}
                                    className="border-b-2 border-black outline-none p-2 bg-transparent"
                                />
                            )
                        }
                    </div>
                </div>
                <div className="flex gap-4">
                    <button
                        type="button"
                        className="px-6 py-2 bg-purple-2 text-white rounded-full mt-4 disabled:opacity-50"
                        onClick={isEdit ? handleSaveChanges : handleEditProfile}
                        disabled={isUploading}
                    >
                        {isEdit ? 'Save Changes' : 'Edit Profile'}
                    </button>
                    {isEdit && (
                        <button
                            type="button"
                            className="px-6 py-2 bg-gray-500 text-white rounded-full mt-4"
                            onClick={handleCancelEdit}
                            disabled={isUploading}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}
export default UserProfilePage;