export const uploadAudioToCloudinary = async (audioBlob) => {
    const formData = new FormData();
    formData.append("file", audioBlob);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET); // Use the same upload preset
    formData.append("folder", "users/comments"); 
    formData.append("resource_type", "raw"); // Important for audio
  
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/raw/upload`, {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      return data.secure_url; 
    } catch (error) {
      console.error("Error uploading audio:", error);
      return null;
    }
  };
  