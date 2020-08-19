import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../lotties/1961-movie-loading.json';

const Loading = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
    };
    return(
        <div className="preload">
            <Lottie 
                options={defaultOptions}
                height={100}
                width={100}
            />
        </div>
    )
}

export default Loading