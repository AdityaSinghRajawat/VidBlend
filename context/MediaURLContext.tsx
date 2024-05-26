import React from 'react';

type FileContextType = {
    mediaURL: string;
    setMediaURL: React.Dispatch<React.SetStateAction<string>>;
    audioURL: string;
    setAudioURL: React.Dispatch<React.SetStateAction<string>>;
    mediaFile: File | null;
    setMediaFile: React.Dispatch<React.SetStateAction<File | null>>;
    audioFile: File | null;
    setAudioFile: React.Dispatch<React.SetStateAction<File | null>>;
};

const MediaURLContext = React.createContext<FileContextType>({
    mediaURL: '',
    setMediaURL: () => { },
    audioURL: '',
    setAudioURL: () => { },
    mediaFile: null,
    setMediaFile: () => { },
    audioFile: null,
    setAudioFile: () => { },
});

export default MediaURLContext;