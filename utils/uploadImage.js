import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

async function uploadImage(imagePath) {
    try {
        const result = await cloudinary.uploader.upload(imagePath);
        fs.unlinkSync(imagePath);
        return result;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}

export default uploadImage;