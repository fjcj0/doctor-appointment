import FullScreenTsx from "../../tools/FullScreenTsx";
import Animation from '../../components/Animation';
import HeaderAuth from '../../components/HeaderAuth';
import FloatInput from "../../components/ui/FloatInput";
import { useEffect, useState } from "react";
import ButtonAuth from "../../components/ui/ButtonAuth";
import LoaderPage from "../../components/LoaderPage";
import { circleIcon } from "../../constants/data";
import type { LoginStatusProp } from "../../global";
import useDoctorStore from "../../store/DoctorStore";
const LoginDoctorOrAdminPage = () => {
    const { loginDoctor, isLoading } = useDoctorStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
    const [loginStatus, setLoginStatus] = useState<LoginStatusProp>('doctor');
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoadingPage(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const handleToggleLoginStatus = () => {
        setIsLoadingPage(true);
        setEmail('');
        setPassword('');
        setErrorEmail('');
        setErrorPassword('');
        setLoginStatus(loginStatus === 'doctor' ? 'admin' : 'doctor');
        const timer = setTimeout(() => {
            setIsLoadingPage(false);
        }, 1000);

        return () => clearTimeout(timer);
    };
    const handleClick = async () => {
        setErrorEmail('');
        setErrorPassword('');
        let hasError = false;
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
            if (loginStatus === 'doctor') {
                await loginDoctor(email, password);
            } else if (loginStatus === 'admin') {

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
    if (isLoadingPage) {
        return <LoaderPage />;
    }
    return (
        <FullScreenTsx>
            <div className="max-w-5xl mx-3 border-[1px] border-gray-300 rounded-lg grid grid-cols-1 md:grid-cols-2">
                <div className="w-full flex-center">
                    <Animation />
                </div>
                <div className="w-full p-6 flex flex-col items-center justify-center">
                    <HeaderAuth
                        title={`Log In As ${loginStatus === 'doctor' ? 'Doctor' : 'Admin'}`}
                        pargraph="Welcome to our secure authentication platform where your digital safety is our utmost priority"
                    />
                    <div className="w-full items-start justify-start">
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
                    </div>
                    <div className="w-full flex items-center justify-between">
                        <ButtonAuth text="Sign In" onPress={handleClick} isLoading={isLoading} />
                        <button
                            type="button"
                            className="font-poppins text-xs hover:underline duration-300 transition-all flex items-center justify-center gap-1"
                            onClick={handleToggleLoginStatus}
                        >
                            <img src={circleIcon} alt="Toggle login type" className="w-4 h-4" />
                            <p>Change to {loginStatus === 'admin' ? 'doctor' : 'admin'}</p>
                        </button>
                    </div>
                </div>
            </div>
        </FullScreenTsx>
    );
}
export default LoginDoctorOrAdminPage;