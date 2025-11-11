import { useState } from "react";
import { userLogo } from "../../constants/data";
import FloatInput from "../../components/ui/FloatInput";
const UserProfilePage = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [errorName, setErrorName] = useState('');
    const [errorPhone, setErrorPhone] = useState('');
    const [address, setAddress] = useState('');
    const [errorAddress, setErrorAddress] = useState('');
    const validateName = (name: string) => {
        if (name.length > 0 && name.length < 4) {
            setErrorName("Name must be at least 4 characters");
        } else {
            setErrorName("");
        }
    };
    const handleNameChange = (value: string) => {
        setName(value);
        validateName(value);
    };
    const handleSaveChanges = () => {
        validateName(name);
        if (errorName) {
            return;
        }
        setIsEdit(false);
    };
    const handleEditProfile = () => {
        setIsEdit(true);
    };
    return (
        <section className="my-10 font-nunito">
            <div className="flex flex-col items-start justify-start gap-5">
                <div className="w-full max-w-[40rem] flex flex-col gap-2 items-start justify-start">
                    {
                        !isEdit ? (
                            <img src={userLogo} className="w-32" alt="User profile" />
                        ) : (
                            <button type="button">
                                <img src={userLogo} alt="User profile" />
                            </button>
                        )
                    }
                    {
                        !isEdit ? (
                            <h1 className="text-2xl font-bold">Omar Coding</h1>
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
                        <p>OmarCoding@gmail.com</p>
                    </div>
                    <div className="flex gap-10 items-start justify-start w-full">
                        <p className="min-w-[80px] pt-7">Phone:</p>
                        {
                            !isEdit ? (
                                <p className="pt-7">+12-345-22-3</p>
                            ) : (
                                <div className="flex-1">
                                    <FloatInput
                                        value={phone}
                                        setValue={setPhone}
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
                        <p className="min-w-[80px pt-7 pr-4">Address:</p>
                        {
                            !isEdit ? (
                                <p className="pt-7">12 Street,texas</p>
                            ) : (
                                <div className="flex-1">
                                    <FloatInput
                                        value={address}
                                        setValue={setAddress}
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
                                <p className="pt-4">Female</p>
                            ) : (
                                <select defaultValue={'female'} className="border-b-2 border-black outline-none p-2 bg-transparent">
                                    <option value="" disabled={true}>Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            )
                        }
                    </div>
                    <div className="flex gap-10 items-start justify-start w-full">
                        <p className="min-w-[80px] pt-4">BirthDay:</p>
                        {
                            !isEdit ? (
                                <p className="pt-4">January 1, 1990</p>
                            ) : (
                                <input
                                    type="date"
                                    className="border-b-2 border-black outline-none p-2 bg-transparent"
                                />
                            )
                        }
                    </div>
                </div>
                <button
                    type="button"
                    className="px-6 py-2 bg-purple-2 text-white rounded-full mt-4"
                    onClick={isEdit ? handleSaveChanges : handleEditProfile}
                >
                    {isEdit ? 'Save Changes' : 'Edit Profile'}
                </button>
            </div>
        </section>
    );
}
export default UserProfilePage;