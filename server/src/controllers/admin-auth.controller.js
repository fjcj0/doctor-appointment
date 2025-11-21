import { request, response } from 'express';
import { Admin } from '../models/admin.model.js';
import { isEmailExist } from '../utils/isEmailExist.js';
import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
export const checkAdminAuth = async (request, response) => {
    try {
        const admin = await Admin.findById(request.adminId).select('-password');
        if (!admin) {
            return response.status(404).json({ success: false, message: 'error no admin is authenticated!!' });
        }
        return response.status(200).json({
            success: true, admin: {
                ...admin._doc,
                password: undefined
            }
        });
    } catch (error) {
        console.log("Internal Server Error: ", error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
}
export const createAdminAccount = async (request, response) => {
    try {
        const { name, email, password } = request.body;
        if (!name || !email || !password) {
            return response.status(400).json({
                success: false,
                error: 'Error all fields are required!!'
            });
        }
        const emailExists = await isEmailExist(email);
        if (emailExists) {
            return response.status(405).json({
                success: false,
                error: 'Email is already used try another one!!'
            });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const admin = new Admin({
            password: hashedPassword,
            email,
            name,
            lastLogin: Date.now()
        });
        await admin.save();
        generateTokenAndSetCookie(response, admin._id, 'admin');
        return response.status(201).json({
            success: true,
            message: 'Admin Created successfully',
            admin: {
                ...admin._doc,
                password: undefined
            }
        });
    } catch (error) {
        console.log("Internal Server Error: ", error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
}
export const loginAdmin = async (request, response) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).json({
                success: false,
                error: 'Email and password are required'
            });
        }
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return response.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }
        const isPasswordValid = await bcryptjs.compare(password, admin.password);
        if (!isPasswordValid) {
            return response.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }
        admin.lastLogin = Date.now();
        await admin.save();
        generateTokenAndSetCookie(response, admin._id, 'admin');
        return response.status(200).json({
            success: true,
            message: 'You logged in successfully!!',
            admin: {
                ...admin._doc,
                password: undefined
            }
        });
    } catch (error) {
        console.log("Internal Server Error: ", error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
}
export const updateAdmin = async (request, response) => {
    try {
        const { name, image } = request.body;
        if (!name && !image) {
            return response.status(400).json({
                success: false,
                error: 'At least one field (name or image) is required',
            });
        }
        const admin = await Admin.findById(request.adminId);
        if (!admin) {
            return response.status(404).json({
                success: false,
                error: 'Admin not found'
            });
        }
        if (name) admin.name = name;
        if (image) admin.profilePicture = image;
        await admin.save();
        return response.status(200).json({
            success: true,
            message: 'Admin has been updated successfully!!',
            admin: {
                ...admin._doc,
                password: undefined,
            }
        });
    } catch (error) {
        console.log("Internal Server Error: ", error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
}
export const logoutAdmin = async (request, response) => {
    try {
        response.clearCookie('admin_token');
        return response.status(200).json({
            success: true,
            message: 'You have been logged out successfully!!'
        });
    } catch (error) {
        console.log("Internal Server Error: ", error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
}