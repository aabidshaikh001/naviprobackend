import QRCode from '../models/qrModel.js';
import { uploadQRCodeToCloudinary, deleteQRCodeFromCloudinary } from '../utils/cloudinaryUtil.js';

export const uploadQRCode = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload the new QR code to Cloudinary
    const result = await uploadQRCodeToCloudinary(req.file.path);

    // Check if a previous QR code exists
    const oldQRCode = await QRCode.findOne();
    if (oldQRCode) {
      // Delete the old QR code from Cloudinary
      await deleteQRCodeFromCloudinary(oldQRCode.filename);
      // Remove the old QR code from the database
      await QRCode.deleteOne({ _id: oldQRCode._id });
    }

    // Save the new QR code to the database
    const qrCode = new QRCode({
      filename: result.public_id,
      url: result.secure_url,
    });
    await qrCode.save();

    res.status(200).json({
      message: 'QR Code uploaded successfully',
      url: result.secure_url,
    });
  } catch (error) {
    console.error('Error uploading QR Code:', error);
    res.status(500).json({ message: 'Failed to upload QR Code' });
  }
};


export const getLatestQRCode = async (req, res) => {
    try {
      const latestQRCode = await QRCode.findOne(); // Only one record exists now
      if (!latestQRCode) {
        return res.status(404).json({ message: 'No QR code found' });
      }
      res.status(200).json({ url: latestQRCode.url });
    } catch (error) {
      console.error('Error fetching QR Code:', error);
      res.status(500).json({ message: 'Failed to fetch QR Code' });
    }
  };
  