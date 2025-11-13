import React from 'react';
import Lottie from 'lottie-react';
import PageNotFoundAnimation from '../animations/PageNotFoundAnimation.json';
const Page404 = () => {
    return (
        <div className="w-full min-h-[100vh] flex flex-col items-center justify-center bg-gray-50">
            <Lottie
                animationData={PageNotFoundAnimation}
                loop={true}
                autoplay={true}
                className='max-w-5xl'
            />
        </div>
    );
}

export default Page404;