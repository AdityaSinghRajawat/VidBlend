"use client";

import { useState, useRef, useEffect, useContext } from 'react';
import { Group, Button, Slider, Box } from '@mantine/core';
import { Loader2 } from 'lucide-react';
import MediaURLContext from '@/context/MediaURLContext';
import { mergeAudioVideoFiles } from '@/utils/mergedMedia';

const Footer: React.FC = () => {
    const [height, setHeight] = useState(100);
    const { audioFile, mediaFile, setMediaURL } = useContext(MediaURLContext);
    const [mergedVideoUrl, setMergedVideoUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleMerge = () => {
        if (mediaFile && audioFile) {
            setIsLoading(true);
            mergeAudioVideoFiles(mediaFile, audioFile)
                .then((mergedBlob) => {
                    const url = URL.createObjectURL(mergedBlob);
                    setMergedVideoUrl(url);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Error merging audio and video:', error);
                    setIsLoading(false);
                });
        }
    };

    console.log(mergedVideoUrl);


    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        let newHeight = window.innerHeight - e.clientY;
        if (newHeight > window.innerHeight / 2) {
            newHeight = window.innerHeight / 2;
        }
        setHeight(newHeight);
    };

    const handleMouseUp = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };

    return (
        <footer
            className="p-4 bg-blue-500 text-white bottom-0 transform origin-bottom transition-all duration-200 relative"
            style={{ height: `${height}px`, left: '7rem', width: 'calc(100% - 7rem)' }}
            onMouseDown={handleMouseDown}
        >
            <div className="absolute top-0 left-0 right-0 flex justify-center items-center h-6 cursor-move gap-2"></div>
            <div className='flex justify-center gap-4'>
                {audioFile && mediaFile && (
                    <Button
                        className="text-gray-800 hover:bg-gray-200 border rounded-lg"
                        onClick={handleMerge}
                    >
                        Merge
                    </Button>
                )}
                {isLoading && <Loader2 className="w-7 h-7 animate-spin" />}
                {mergedVideoUrl && (
                    <Button className="text-gray-800 hover:bg-gray-200 border rounded-lg">
                        <a href={mergedVideoUrl} download="mergedFile.mp4">Download merged file</a>
                    </Button>
                )}
            </div>
        </footer>
    );
};

export default Footer;