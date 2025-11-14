import { useState, useEffect } from "react";
import FloatInput from "../../components/ui/FloatInput";
import FullScreenTsx from "../../tools/FullScreenTsx";
import ButtonAuth from "../../components/ui/ButtonAuth";
import SecurityAnimation from "../../components/SecurityAnimation";
import { ArrowLeft } from 'lucide-react';
import { Link } from "react-router-dom";
import VerificationCode from "./VerificationCode";
import LoaderPage from "../../components/LoaderPage";
const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [pendingVerification, setPendingVerification] = useState<boolean>(false);
    const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoadingPage(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    useEffect(() => {
        if (!pendingVerification) {
            setIsLoadingPage(true);
            const timer = setTimeout(() => {
                setIsLoadingPage(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [pendingVerification]);
    const handleEmailChange = (value: string) => {
        setEmail(value);
        if (errorEmail && value) {
            setErrorEmail('');
        }
    };
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const handleClick = async () => {
        if (!email) {
            setErrorEmail('Email is required');
            return;
        }
        if (!validateEmail(email)) {
            setErrorEmail('Email is not valid');
            return;
        }
        setPendingVerification(true);
    };
    if (isLoadingPage) {
        return <LoaderPage />;
    }
    if (pendingVerification) {
        return (
            <VerificationCode
                email={email}
                setPendingVerification={setPendingVerification}
                isResetPassword={true}
            />
        );
    }
    return (
        <FullScreenTsx>
            <div className="max-w-5xl m-3 border-[1px] p-5 border-gray-300 rounded-lg flex flex-col items-center justify-center">
                <SecurityAnimation />
                <FloatInput
                    value={email}
                    setValue={handleEmailChange}
                    isPassword={false}
                    label="Email"
                    type="email"
                    error={errorEmail}
                />
                <div className="w-full items-start justify-start">
                    <ButtonAuth
                        text="Send Code"
                        onPress={handleClick}
                    />
                </div>
                <div className="w-full mt-3 flex items-start justify-start">
                    <Link
                        to={'/login'}
                        className="flex items-center justify-center gap-x-[1px]"
                    >
                        <ArrowLeft size={18} />
                        <p className="text-black font-bold text-xs font-poppins border-b border-transparent hover:border-b-black duration-300 transition-all">Back to login page</p>
                    </Link>
                </div>
            </div>
        </FullScreenTsx>
    );
}
export default ForgetPassword;