import { Doctor } from "../models/doctor.model.js";
import { cache } from "../config/cache.js";
import { request, response } from 'express';
export const doctors_limiting = async (request, response) => {
    try {
        const cacheKey = 'doctors_limiting';
        let doctors = cache.get(cacheKey);
        if (!doctors) {
            doctors = await Doctor.find({})
                .select(['_id', 'name', 'available', 'speciality', 'profilePicture'])
                .limit(5);
            cache.set(cacheKey, doctors, 300);
        }
        return response.status(200).json({
            success: true,
            doctors,
        });
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
}
export const doctor = async (request, response) => {
    try {
        const { id } = request.params;
        if (!id) {
            return response.status(400).json({
                success: false,
                error: 'Doctor ID is required'
            });
        }
        const cacheKey = `doctor_${id}`;
        let doctor = cache.get(cacheKey);
        if (!doctor) {
            doctor = await Doctor.findById(id).select(['-email', '-password', '-lastLogin', '-createdAt', '-updatedAt']);
            if (!doctor) {
                return response.status(404).json({
                    success: false,
                    error: 'Doctor not found'
                });
            }
            cache.set(cacheKey, doctor, 600);
        }
        return response.status(200).json({
            success: true,
            doctor,
        });
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
}
export const doctors = async (request, response) => {
    try {
        const cacheKey = 'doctors';
        let doctors = cache.get(cacheKey);
        if (!doctors) {
            doctors = await Doctor.find({})
                .select(['_id', 'name', 'available', 'speciality', 'profilePicture'])
                .limit(5);
            cache.set(cacheKey, doctors, 300);
        }
        return response.status(200).json({
            success: true,
            doctors,
        });
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
}