"use client";

import MediaURLContext from '@/context/MediaURLContext';
import { Input, InputLabel } from '@mantine/core';
import { Upload } from 'lucide-react';
import React, { useContext, useState } from 'react'

const Page = () => {

    const [audio, setAudio] = useState<File>();
    const { audioURL, setAudioURL, setAudioFile } = useContext(MediaURLContext);


    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = e.target?.files?.[0];
        setAudio(audio)
        setAudioFile(audio || null)

        if (audioURL) {
            URL.revokeObjectURL(audioURL);
        }

        if (audio) {
            const url = URL.createObjectURL(audio);
            setAudioURL(url);
        }

    }

    console.log(audio);
    console.log(audioURL);

    return (
        <div className="h-screen w-full p-4 overflow-auto md:w-1/4 border flex flex-col space-y-4">
            <h2 className='text-xl font-bold'>Add Audio</h2>

            <div>
                <Input
                    type="file"
                    accept="audio/*"
                    id="audio"
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
                    htmlFor="audio"
                >
                    {audio ? (
                        <p>{audio.name}</p>
                    ) : (
                        <div className='flex gap-2'>
                            <Upload />
                            <p>Upload an Audio</p>
                        </div>
                    )}
                </InputLabel>
            </div>

        </div>
    )

}

export default Page;
