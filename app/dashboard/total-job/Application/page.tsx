'use client';

import React, { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { useSearchParams } from 'next/navigation';

const UploadForm = () => {
  const { user } = useUser(); // Get the user from context
  const searchParams = useSearchParams();
  const jobId = searchParams.get('jobId'); // Get jobId from URL
  const userId = user?.id || '';

  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !jobId || !userId) {
      alert('Missing required fields');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_unsigned_preset'); // Replace with your preset

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const result = await response.json();
      if (result.secure_url) {
        const application = await fetch('/api/application', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jobId,
            userId,
            resume: result.secure_url,
          }),
        });

        if (application.ok) {
          alert('File uploaded successfully');
        } else {
          alert('Failed to save application');
        }
      } else {
        alert('File upload failed');
      }
    } catch (error) {
      console.error(error);
      alert('File upload failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => {
          if (e.target.files?.length) setFile(e.target.files[0]);
        }}
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
