import FullScreenTsx from "../../tools/FullScreenTsx";
import Animation from '../../components/Animation';
import HeaderAuth from '../../components/HeaderAuth';
import FloatInput from "../../components/ui/FloatInput";
import { useEffect, useState } from "react";
import ButtonAuth from "../../components/ui/ButtonAuth";
import TextAuth from "../../components/TextAuth";
import LoaderPage from "../../components/LoaderPage";
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
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
            console.log('Login successful', { email, password });
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
        return (
            <LoaderPage />
        );
    }
    return (
        <FullScreenTsx>
            <div className="max-w-5xl mx-3 border-[1px] border-gray-300 rounded-lg grid grid-cols-1 md:grid-cols-2">
                <div className="w-full flex-center">
                    <Animation />
                </div>
                <div className="w-full p-6 flex flex-col items-center justify-center">
                    <HeaderAuth
                        title="Log In As User"
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
                    <TextAuth text="Frogot Your Password?" styling="flex items-end justify-end" direct="/forget-password" textStyle="text-blue-600 hover:text-blue-800" />
                    <div className="w-full items-start justify-start">
                        <ButtonAuth text="Sign In" onPress={handleClick} />
                    </div>
                    <TextAuth textStyle="text-black hover:text-black/55 " text="Dont You Have An Account?" styling="flex items-start justify-start" direct="/create-account" />
                </div>
            </div>
        </FullScreenTsx>
    );
}
export default LoginPage;