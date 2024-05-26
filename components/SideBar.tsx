"use client";

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mantine/core';
import { Camera, Folder, MenuIcon, Music, Notebook, Search, Settings, Square, Subtitles, TextCursor } from 'lucide-react';

const links = [
    { label: 'Search', icon: <Search className='h-5 w-5 text-red-500' />, path: '/media' },
    { label: 'Settings', icon: <Settings className='h-5 w-5 text-blue-500' />, path: '/media' },
    { label: 'Media', icon: <Folder className='h-5 w-5 text-green-500' />, path: '/media' },
    { label: 'Audio', icon: <Music className='h-5 w-5 text-yellow-500' />, path: '/audio' },
    { label: 'Subtitles', icon: <Subtitles className='h-5 w-5 text-indigo-500' />, path: '/media' },
    { label: 'Text', icon: <Notebook className='h-5 w-5 text-purple-500' />, path: '/media' },
    { label: 'Elements', icon: <Square className='h-5 w-5 text-pink-500' />, path: '/media' },
    { label: 'Record', icon: <Camera className='h-5 w-5 text-gray-500' />, path: '/media' },
];

const Sidebar: FC = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='z-10'>
            <button
                className="md:hidden p-2 rounded-md text-gray-400"
                onClick={() => setIsOpen(!isOpen)}
            >
                <MenuIcon className="h-6 w-6" />
            </button>
            <div
                className={`w-28 h-screen p-4 border-r border-gray-200 flex flex-col items-center justify-center md:block ${isOpen ? 'block' : 'hidden'}`}
            >
                <div className="flex flex-col space-y-8">
                    {links.map((link) => (
                        <Button
                            key={link.label}
                            onClick={() => router.push(link.path)}
                            variant="subtle"
                            fullWidth
                        >
                            <div className="flex flex-col items-center">
                                {link.icon}
                                {link.label}
                            </div>
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;



