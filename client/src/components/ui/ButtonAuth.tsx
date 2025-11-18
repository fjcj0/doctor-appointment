import LoadingButton from "../../tools/LoadingButton";

const ButtonAuth = ({ text, onPress, isLoading }: {
    text: string,
    onPress: () => Promise<void>;
    isLoading: boolean
}) => {
    return (
        <button
            disabled={isLoading}
            className={`px-9 text-sm py-4 font-bold  border border-black text-black duration-300 transition-all font-poppins ${isLoading ? 'opacity-50' : 'hover:bg-black hover:text-white'}`} type="button" onClick={onPress}>
            {isLoading ? <LoadingButton color="blue-500" /> : text}
        </button>
    );
}
export default ButtonAuth;