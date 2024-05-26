import { Video } from 'lucide-react';
import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-blue-500 p-4 flex items-center">
            <Video className="text-white mr-2 h-8 w-8" />
            <h1 className="text-2xl text-white font-bold">VidBlend</h1>
        </nav>
    );
};

export default Navbar;