const ButtonAuth = ({ text, onPress }: {
    text: string,
    onPress: () => Promise<void>;
}) => {
    return (
        <button className="px-9 text-sm py-4 font-bold hover:bg-black hover:text-white border border-black text-black duration-300 transition-all font-poppins" type="button" onClick={onPress}>
            {text}
        </button>
    );
}
export default ButtonAuth;