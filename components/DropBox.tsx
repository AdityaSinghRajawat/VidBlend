import React, { useContext } from 'react';
import { X } from 'lucide-react';
import { Input, InputLabel } from '@mantine/core';
import MediaURLContext from '@/context/MediaURLContext';
import { useRouter } from 'next/navigation';

interface UploadModalProps {
    onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose }) => {
    const { mediaURL, setMediaURL, setMediaFile, mediaFile } = useContext(MediaURLContext);
    const router = useRouter();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const media = e.target?.files?.[0];
        setMediaFile(media || null);

        if (mediaURL) {
            URL.revokeObjectURL(mediaURL);
        }

        if (media) {
            const url = URL.createObjectURL(media);
            setMediaURL(url);
            router.push('/audio');
        }
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="relative bg-white p-8 rounded-lg w-1/3 mx-auto">
                <button className="absolute top-0 right-0 p-2" onClick={onClose}>
                    <X />
                </button>
                <h2 className="text-xl mb-4">Add Audio to Video</h2>
                <Input
                    type="file"
                    accept="video/*"
                    id="media"
                    className="hidden"
                    onChange={handleOnChange}
                />
                <InputLabel
                    className="cursor-pointer border-2 border-blue-500 text-md text-white rounded p-2 w-full h-24 flex items-center justify-center bg-blue-500"
                    htmlFor="media"
                >
                    {mediaFile ? 'File selected' : 'Upload a file here'}
                </InputLabel>
            </div>
        </div>
    );
};

export default UploadModal;