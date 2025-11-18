import FullScreenTsx from "../../tools/FullScreenTsx";
import Animation from '../../components/Animation';
import HeaderAuth from '../../components/HeaderAuth';
import FloatInput from "../../components/ui/FloatInput";
import { useEffect, useState } from "react";
import ButtonAuth from "../../components/ui/ButtonAuth";
import TextAuth from "../../components/TextAuth";
import { warningIcon } from "../../constants/data";
import LoaderPage from "../../components/LoaderPage";
import VerificationCode from "./VerificationCode";
import useUserStore from "../../store/UserStore";
import toast from 'react-hot-toast';
const CreateAccountPage = () => {
    const { isLoading, createAccount } = useUserStore();
    const [pendingVerification, setPendingVerification] = useState<boolean>(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorName, setErrorName] = useState('');
    const [errorGender, setErrorGender] = useState('');
    const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoadingPage(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    useEffect(() => {
        if (pendingVerification === false) {
            setIsLoadingPage(true);
            const timer = setTimeout(() => {
                setIsLoadingPage(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [pendingVerification]);
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const handleClick = async () => {
        setErrorEmail('');
        setErrorPassword('');
        setErrorName('');
        setErrorGender('');
        let hasError = false;
        if (!name) {
            setErrorName('Name is required');
            hasError = true;
        } else if (name.length < 4) {
            setErrorName('Name must be at most 4 characters long');
            hasError = true;
        }
        if (!gender) {
            setErrorGender('Gender is required');
            hasError = true;
        }
        if (!email) {
            setErrorEmail('Email is required');
            hasError = true;
        } else if (!validateEmail(email)) {
            setErrorEmail('Please enter a valid email address');
            hasError = true;
        }
        if (!password) {
            setErrorPassword('Password is required');
            hasError = true;
        } else if (password.length < 6) {
            setErrorPassword('Password must be at least 6 characters long');
            hasError = true;
        }
        if (!hasError) {
            try {
                await createAccount(name, email, password, gender);
                setPendingVerification(true);
            } catch (error: unknown) {
                console.log(error instanceof Error ? error.message : error);
            }
        }
    };
    const handleEmailChange = (value: string) => {
        setEmail(value);
        if (errorEmail && value) {
            setErrorEmail('');
        }
    };
    const handlePasswordChange = (value: string) => {
        setPassword(value);
        if (errorPassword && value.length >= 6) {
            setErrorPassword('');
        }
    };
    const handleNameChange = (value: string) => {
        setName(value);
        if (errorName) {
            if (value && value.length <= 4) {
                setErrorName('');
            } else if (!value) {
                setErrorName('Name is required');
            } else if (value.length > 4) {
                setErrorName('Name must be at most 4 characters long');
            }
        }
    };
    const handleGenderChange = (value: string) => {
        setGender(value);
        if (errorGender && value) {
            setErrorGender('');
        }
    };
    if (isLoadingPage) {
        return <LoaderPage />;
    }
    if (pendingVerification) {
        return (
            <VerificationCode
                email={email}
                setPendingVerification={setPendingVerification}
                isResetPassword={false}
            />
        );
    }
    return (
        <FullScreenTsx>
            <div className="max-w-5xl m-3 border-[1px] border-gray-300 rounded-lg grid grid-cols-1 md:grid-cols-2">
                <div className="w-full flex-center">
                    <Animation />
                </div>
                <div className="w-full p-6 flex flex-col items-center justify-center">
                    <HeaderAuth
                        title="Create Account"
                        pargraph="Welcome to our secure authentication platform where your digital safety is our utmost priority"
                    />
                    <div className="w-full items-start justify-start space-y-4">
                        <FloatInput
                            value={name}
                            setValue={handleNameChange}
                            isPassword={false}
                            label="Name"
                            type="text"
                            error={errorName}
                        />
                        <FloatInput
                            value={email}
                            setValue={handleEmailChange}
                            isPassword={false}
                            label="Email"
                            type="email"
                            error={errorEmail}
                        />
                        <FloatInput
                            value={password}
                            setValue={handlePasswordChange}
                            isPassword={true}
                            label="Password"
                            type="password"
                            error={errorPassword}
                        />
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Gender
                            </label>
                            <div className="flex space-x-4">
                                {['male', 'female'].map((option) => (
                                    <label key={option} className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value={option}
                                            checked={gender === option}
                                            onChange={(e) => handleGenderChange(e.target.value)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <span className="text-sm text-gray-700">{option}</span>
                                    </label>
                                ))}
                            </div>
                            {
                                errorGender &&
                                <div className="flex items-center mt-2">
                                    <img src={warningIcon} className="w-4 h-4 mr-1" alt="Error" />
                                    <p className="text-red-600 text-sm">{errorGender}</p>
                                </div>
                            }
                        </div>
                    </div>
                    <TextAuth
                        text="Forgot Your Password?"
                        styling="flex items-end justify-end"
                        direct="/forget-password"
                        textStyle="text-blue-600 hover:text-blue-800"
                    />
                    <div className="w-full items-start justify-start">
                        <ButtonAuth text="Create Account" onPress={handleClick} isLoading={isLoading} />
                    </div>
                    <div className="w-full flex items-start justify-start">
                        <TextAuth
                            text="Have an account?"
                            styling="flex items-start justify-start"
                            direct="/login"
                            textStyle="text-red-500 hover:text-red-800"
                        />
                    </div>
                </div>
            </div>
        </FullScreenTsx>
    );
}
export default CreateAccountPage;