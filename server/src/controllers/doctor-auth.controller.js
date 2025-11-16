import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import { Doctor } from "../models/doctor.model.js";
import { isEmailExist } from "../utils/isEmailExist.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { Admin } from "../models/admin.model.js";
import { removeCache } from "../utils/RemoveCache.js";
export const checkAuthDoctor = async (request, response) => {
    try {
        const doctor = await Doctor.findById(request.doctorId).select('-password');
        if (!doctor) {
            return response.status(404).json({ success: false, message: 'error no doctor is authenticated!!' });
        }
        return response.status(200).json({ success: true, doctor });
    } catch (error) {
        console.log("Internal Server Error: ", error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
}
export const createDoctorAccount = async (request, response) => {
    try {
        const { name, email, password, speciality, degree, address, profilePicture, experience, fees, about } = request.body;
        if (!name || !email || !password || !speciality || !degree || !address || !experience || !fees || !about) {
            return response.status(400).json({
                success: false,
                error: 'All fields are required',
            });
        }
        const admin = await Admin.findById(request.adminId);
        if (!admin) {
            return response.status(405).json({
                success: false,
                error: 'No admin to create doctor'
            });
        }
        const emailExists = await isEmailExist(email);
        if (emailExists) {
            return response.status(409).json({
                success: false,
                error: 'This email has been used try another'
            });
        }
        await removeCache('doctors_limiting');
        await removeCache('doctors');
        const hashedPassword = await bcryptjs.hash(password, 10);
        const doctor = new Doctor({
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            address,
            profilePicture,
            experience,
            fees,
            about
        });
        await doctor.save();
        return response.status(201).json({
            success: true,
            message: 'Doctor created successfully',
            doctor: {
                ...doctor._doc,
                password: undefined
            }
        });
    } catch (error) {
        console.log("Internal Server Error: ", error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: `Internal server error ${error instanceof Error ? error.message : error}`
        });
    }
}
export const loginDoctor = async (request, response) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).json({
                success: false,
                error: 'Password and email are required'
            });
        }
        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return response.status(400).json({
                success: false,
                error: 'Invalid credentials'
            });
        }
        const isPasswordValid = await bcryptjs.compare(password, doctor.password);
        if (!isPasswordValid) {
            return response.status(400).json({
                success: false,
                error: 'Invalid credentials'
            });
        }
        generateTokenAndSetCookie(response, doctor._id, 'doctor');
        return response.status(200).json({
            success: true,
            message: 'You logged in successfully!!',
            doctor: {
                id: doctor._id,
                name: doctor.name,
                email: doctor.email,
                speciality: doctor.speciality
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
export const updateDoctor = async (request, response) => {
    try {
        const { name, speciality, degree, address, image, experience, fees, about, available } = request.body;
        const doctor = await Doctor.findById(request.doctorId);
        if (!doctor) {
            return response.status(404).json({
                success: false,
                error: 'Doctor not found!!'
            });
        }
        await removeCache('doctors_limiting');
        await removeCache('doctors');
        if (name) doctor.name = name;
        if (speciality) doctor.speciality = speciality;
        if (degree) doctor.degree = degree;
        if (address) doctor.address = address;
        if (image) doctor.profilePicture = image;
        if (experience) doctor.experience = experience;
        if (fees) doctor.fees = fees;
        if (about) doctor.about = about;
        if (available !== undefined) doctor.available = available;
        await doctor.save();
        return response.status(200).json({
            success: true,
            message: 'Doctor updated successfully!!',
            doctor: {
                ...doctor._doc,
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
export const logoutDoctor = async (request, response) => {
    try {
        response.clearCookie('doctor_token');
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