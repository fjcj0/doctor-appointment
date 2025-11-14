import { Link, useParams } from "react-router-dom";
import Page404 from "../../components/Page404";
import { useState } from "react";
import LoaderPage from "../../components/LoaderPage";
import FullScreenTsx from "../../tools/FullScreenTsx";
import FloatInput from "../../components/ui/FloatInput";
import { ArrowLeft } from "lucide-react";
import ButtonAuth from "../../components/ui/ButtonAuth";
import SecurityAnimation from "../../components/SecurityAnimation";
const RestPasswordPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
    const param = useParams();
    const { code } = param;
    if (isLoading) {
        return <LoaderPage />;
    }
    if (!code) {
        return <Page404 />;
    }
    const handleChangePassword = async () => {
        setErrorPassword('');
        setErrorConfirmPassword('');
        if (!password) {
            setErrorPassword('Password is required');
            return;
        }
        if (password.length < 6) {
            setErrorPassword('Password must be at least 6 characters long');
            return;
        }
        if (!confirmPassword) {
            setErrorConfirmPassword('Please confirm your password');
            return;
        }
        if (password !== confirmPassword) {
            setErrorConfirmPassword('Passwords do not match');
            return;
        }
        setIsLoading(true);
        try {
            console.log('Password reset logic would go here with code:', code);
            setTimeout(() => {
                console.log('Password reset successful');
                setIsLoading(false);
            }, 1000);

        } catch (error) {
            setErrorPassword('Failed to reset password. Please try again.');
            setIsLoading(false);
        }
    }
    return (
        <FullScreenTsx>
            <div className="max-w-5xl m-3 border-[1px] p-5 border-gray-300 rounded-lg flex flex-col items-center justify-center">
                <SecurityAnimation />
                <FloatInput
                    value={password}
                    setValue={setPassword}
                    isPassword={true}
                    label="Password"
                    type="password"
                    error={errorPassword}
                />
                <FloatInput
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                    isPassword={true}
                    label="Confirm Password"
                    type="password"
                    error={errorConfirmPassword}
                />
                <div className="w-full items-start justify-start">
                    <ButtonAuth
                        text={isLoading ? "Resetting..." : "Reset Password"}
                        onPress={handleChangePassword}
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
export default RestPasswordPage;