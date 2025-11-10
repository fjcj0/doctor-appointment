import { closeEye, openEye, warningIcon } from "../../constants/data";
import { useState } from "react";
const FloatInput = ({
    value,
    setValue,
    isPassword,
    label,
    error,
    type
}: {
    value: string;
    setValue: (value: string) => void;
    isPassword: boolean;
    label: string;
    error?: string | null | undefined;
    type: "text" | "email" | "password" | "number" | "tel" | "url";
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const shouldFloat = isFocused || value.length > 0;
    const eyeIcon = showPassword ? openEye : closeEye;
    const eyeAlt = showPassword ? "Hide password" : "Show password";
    const getInputType = (): string => {
        if (isPassword) {
            return showPassword ? "text" : "password";
        }
        return type;
    };
    const getLabelColor = (): string => {
        if (error) {
            return 'text-red-600';
        }
        if (isFocused) {
            return 'text-blue-500';
        }
        return 'text-gray-600';
    };
    return (
        <div className='w-full relative flex flex-col mb-4'>
            <div className="relative">
                <label
                    className={`absolute text-sm left-1 transition-all duration-200 ${shouldFloat
                        ? 'top-1 text-xs -translate-y-1'
                        : 'top-6 text-sm'
                        } ${getLabelColor()} pointer-events-none`}
                >
                    {label}
                </label>
                <input
                    value={value}
                    type={getInputType()}
                    className={`w-full p-3 pt-4 border-b-2 bg-transparent outline-none transition-colors duration-200 ${error
                        ? 'border-red-600 text-red-600 placeholder-red-400'
                        : 'border-black text-black placeholder-gray-400 focus:border-blue-500'
                        }`}
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder=""
                />
                {isPassword && (
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <img
                            src={eyeIcon}
                            alt={eyeAlt}
                            className="w-5 h-5"
                        />
                    </button>
                )}
            </div>
            {error && (
                <div className="flex items-center mt-2">
                    <img src={warningIcon} className="w-4 h-4 mr-1" alt="Error" />
                    <p className="text-red-600 text-sm">{error}</p>
                </div>
            )}
        </div>
    );
}
export default FloatInput;