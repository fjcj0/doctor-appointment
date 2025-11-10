import Lottie from 'react-lottie';
import animation from '../animations/SecurityAnimation.json';

const SecurityAnimation = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animation,
    };
    return (
        <div className="w-full" style={{ pointerEvents: 'none' }}>
            <Lottie
                options={defaultOptions}
                height={330}
                width={330}
                isClickToPauseDisabled={true}
            />
        </div>
    );
}
export default SecurityAnimation;