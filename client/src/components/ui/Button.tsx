const Button = ({ hoverColor, handleClick, text }: {
    hoverColor: string;
    handleClick: () => Promise<void>;
    text: string;
}) => {
    return (
        <button onClick={handleClick} type="button" className={`px-5 py-2 rounded-md border-[0.3px] border-gray-300 text-[#696969] duration-300 transition-all hover:text-white hover:${hoverColor}`}>
            {text}
        </button>
    );
}
export default Button;