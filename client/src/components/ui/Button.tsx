export const Button = ({ hoverColor, handleClick, text }: {
    hoverColor: string;
    handleClick: () => Promise<void>;
    text: string;
}) => {
    const getHoverClass = () => {
        switch (hoverColor) {
            case 'bg-purple-2':
                return 'hover:bg-purple-2';
            case 'bg-red-2':
                return 'hover:bg-red-2';
            default:
                return 'hover:bg-red-1';
        }
    };
    return (
        <button
            onClick={handleClick}
            type="button"
            className={`px-5 py-2 rounded-md border-[0.3px] border-gray-300 text-[#696969] duration-300 transition-all hover:text-white ${getHoverClass()}`}
        >
            {text}
        </button>
    );
}