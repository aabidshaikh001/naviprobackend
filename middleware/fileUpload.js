import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "user_details", // Folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"], // Allowed file formats
  },
});

const upload = multer({ storage });

export default upload;
