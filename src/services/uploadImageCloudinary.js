import axios from "axios";

export const uploadImageToCloudinary = async (file) => {
    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload";
    const UPLOAD_PRESET = "YOUR_UPLOAD_PRESET"; 

    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        const response = await axios.post(CLOUDINARY_URL, formData)
    

        const data = await response.json();
        return data.secure_url; // Get the uploaded image URL
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};
