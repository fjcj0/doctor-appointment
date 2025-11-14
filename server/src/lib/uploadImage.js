import { request, response } from 'express';
import cloudinary from '../config/cloudinary.js';
export const uploadImage = async (request, response) => {
    try {
        if (!request.file) {
            return response.status(400).json({
                success: false,
                message: 'No image file provided'
            });
        }
        const b64 = Buffer.from(request.file.buffer).toString('base64');
        const dataURI = `data:${request.file.mimetype};base64,${b64}`;
        const result = await cloudinary.uploader.upload(dataURI, {
            folder: 'uploads',
            resource_type: 'auto'
        });
        return response.status(200).json({
            success: true,
            message: 'Image uploaded successfully!!',
            image: result.secure_url
        });
    } catch (error) {
        console.error('Upload error:', error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            message: 'Error uploading image',
            error: error.message
        });
    }
}