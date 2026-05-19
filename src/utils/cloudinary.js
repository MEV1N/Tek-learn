// src/utils/cloudinary.js

export const uploadToCloudinary = async (file) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Upload failed');
    }
    
    const data = await response.json();
    return data.url; // This is the secure URL returned from the backend
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};
