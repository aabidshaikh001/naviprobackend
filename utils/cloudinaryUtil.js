import cloudinary from '../config/cloudinaryConfig.js';

// Upload QR Code to Cloudinary
export const uploadQRCodeToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'qr_codes', // Specify folder in Cloudinary
      resource_type: 'image', // File type
    });
    return result; // Returns secure_url, public_id, etc.
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

// Delete QR Code from Cloudinary
export const deleteQRCodeFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
};
