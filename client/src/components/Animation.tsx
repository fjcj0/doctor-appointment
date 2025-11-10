import Lottie from 'react-lottie';
import animation from '../animations/animation.json';
const Animation = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animation,
    };
    return (
        <div className="w-full" style={{ pointerEvents: 'none' }}>
            <Lottie
                options={defaultOptions}
                height={400}
                width={400}
                isClickToPauseDisabled={true}
            />
        </div>
    );
}
export default Animation;