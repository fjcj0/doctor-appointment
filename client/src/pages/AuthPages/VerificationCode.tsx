import { useEffect, useState } from "react";
import SecurityAnimation from "../../components/SecurityAnimation";
import FloatInput from "../../components/ui/FloatInput";
import FullScreenTsx from "../../tools/FullScreenTsx";
import ButtonAuth from "../../components/ui/ButtonAuth";
import { ArrowLeft } from "lucide-react";
import LoaderPage from "../../components/LoaderPage";
import { useNavigate } from "react-router";
const VerificationCode = ({ email, setPendingVerification, isResetPassword }: {
    email: string;
    setPendingVerification: (value: boolean) => void;
    isResetPassword: boolean;
}) => {
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [errorCode, setErrorCode] = useState('');
    const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoadingPage(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    const handleCodeChange = (value: string) => {
        setCode(value);
        if (errorCode && value) {
            setErrorCode('');
        }
    };
    const handleCode = async () => {
        if (!code) {
            setErrorCode('Code is required');
            return;
        }
        if (code.length !== 6) {
            setErrorCode('Code must be exactly 6 digits');
            return;
        }
        if (isResetPassword == true) {
            navigate(`/reset-password/${code}`);
        }
        else {
            navigate(`/`);
        }
        console.log(`Code is true!!`);
    };
    const handleBackToForgetPassword = () => {
        setPendingVerification(false);
    };
    if (isLoadingPage) {
        return <LoaderPage />;
    }
    return (
        <FullScreenTsx>
            <div className="max-w-5xl m-3 border-[1px] p-5 border-gray-300 rounded-lg flex flex-col items-center justify-center">
                <SecurityAnimation />
                <p className="text-black/65 font-poppins text-xs self-start mb-3">Code has been sent to email: <span className="bg-blue-500/20 px-2 py-2 rounded-3xl ml-1 text-blue-500">{email}</span></p>
                <FloatInput
                    value={code}
                    setValue={handleCodeChange}
                    isPassword={false}
                    label="Verification Code"
                    type="text"
                    error={errorCode}
                />
                <div className="w-full items-start justify-start">
                    <ButtonAuth text="Verify Code" onPress={handleCode} />
                </div>
                <div className="w-full mt-3 flex items-start justify-start">
                    <button
                        onClick={handleBackToForgetPassword}
                        type="button"
                        className="flex items-center justify-center gap-x-[1px]"
                    >
                        <ArrowLeft size={18} />
                        <p className="text-black font-bold text-xs font-poppins border-b border-transparent hover:border-b-black duration-300 transition-all">
                            {isResetPassword ? 'Back to forget password page' : 'Back to login page or create account page'}
                        </p>
                    </button>
                </div>
            </div>
        </FullScreenTsx>
    );
};
export default VerificationCode;