import { Link } from 'react-router-dom';
const TextAuth = ({ text, direct, styling, textStyle }: {
    text: string,
    direct: string,
    styling: string,
    textStyle: string
}) => {
    return (
        <div className={`w-full my-3 ${styling}`}>
            <Link to={direct} className={`${textStyle} hover:underline text-xs duration-300 transition-all`}>{text}</Link>
        </div>
    );
}
export default TextAuth;