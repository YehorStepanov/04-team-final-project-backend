import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'avatars',
        transformation: [
          { width: 500, height: 500, crop: 'fill' },
          { quality: 'auto' },
        ],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );

    uploadStream.end(file.buffer);
  });
};
