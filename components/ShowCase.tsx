import MediaURLContext from '@/context/MediaURLContext';
import React, { useContext, useEffect, useRef } from 'react';

const ShowCase: React.FC = () => {
    const { mediaURL, audioURL } = useContext(MediaURLContext);
    const src = "https://videos.pexels.com/video-files/20184664/20184664-hd_1920_1080_30fps.mp4";
    const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <div className="flex flex-col items-center justify-center flex-1">
            <div className='w-2/3 h-2/3'>
                <video ref={videoRef} src={mediaURL} controls className="w-full h-full object-cover"></video>
            </div>
            <div className="w-2/3 mt-5">
                <audio src={audioURL} controls className="w-full"></audio>
            </div>
        </div>
    );
};

export default ShowCase;