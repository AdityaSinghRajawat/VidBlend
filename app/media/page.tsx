"use client";

import MediaURLContext from '@/context/MediaURLContext';
import { Input, InputLabel } from '@mantine/core';
import { Upload } from 'lucide-react';
import React, { useContext, useState } from 'react'

const Page = () => {

    const [media, setMedia] = useState<File>();
    const { mediaURL, setMediaURL, setMediaFile } = useContext(MediaURLContext);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const media = e.target?.files?.[0];
        setMedia(media)
        setMediaFile(media || null);

        if (mediaURL) {
            URL.revokeObjectURL(mediaURL);
        }

        if (media) {
            const url = URL.createObjectURL(media);
            setMediaURL(url);
        }

    }

    return (
        <div className="h-screen w-full p-4 overflow-auto md:w-1/4 border flex flex-col space-y-4">
            <h2 className='text-xl font-bold'>Add Media</h2>

            <div>
                <Input
                    type="file"
                    accept="video/*"
                    id="media"
                    className="hidden"
                    onChange={
                        (e) => {
                            e.target?.files?.[0];
                            handleOnChange(e);
                        }
                    }
                />
                <InputLabel
                    className="cursor-pointer border-2 border-gray-300 text-md text-gray-400 rounded p-2 w-full h-24 flex items-center justify-center"
                    htmlFor="media"
                >
                    {media ? (
                        <p>{media.name}</p>
                    ) : (
                        <div className='flex gap-2'>
                            <Upload />
                            <p>Upload an media</p>
                        </div>
                    )}
                </InputLabel>
            </div>

        </div>
        // </MediaURLContext.Provider>
    )
}

export default Page;
