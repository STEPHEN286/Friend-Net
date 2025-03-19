export const uploadToCloudinary = async (file) => {
  try {
    // Create form data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    // Upload to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return {
      url: data.secure_url,
      publicId: data.public_id
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

// Function to create a post with media
export const createPostWithMedia = async ({ content, mediaFile, userId, userName }) => {
  try {
    let mediaUrl = null;
    let mediaType = null;

    if (mediaFile) {
      // Determine media type
      mediaType = mediaFile.type.startsWith('image/') ? 'image' : 'video';
      
      // Upload to Cloudinary
      const uploadResult = await uploadToCloudinary(mediaFile);
      mediaUrl = uploadResult.url;
    }

    // Create post document in Firestore
    const postData = {
      content,
      userId,
      userName,
      mediaUrl,
      mediaType,
      timestamp: new Date(),
      likes: [],
      comments: []
    };

    // Add to Firestore using your existing addDoc function
    // Return the created post
    return postData;
  } catch (error) {
    console.error('Error creating post with media:', error);
    throw error;
  }
}; 