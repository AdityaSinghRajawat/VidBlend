"use client";

import UploadModal from '@/components/DropBox';
import React, { useState } from 'react';

const HomePage: React.FC = () => {
  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {showModal && <UploadModal onClose={handleCloseModal} />}
    </div>
  );
};

export default HomePage;
