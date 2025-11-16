import { response, request } from "express";
import { Appointment } from "../models/appointment.model.js";
export const createAppointment = async (request, response) => {
    try {
        const { doctorId, date } = request.body;
        if (!request.userId) {
            return response.status(400).json({
                success: false,
                error: 'You need to login'
            });
        }
        if (!doctorId || !date) {
            return response.status(400).json({
                success: false,
                error: 'Date fields is required and choose doctor'
            });
        }
        const appointment = new Appointment({
            doctorId,
            userId: request.userId,
            date
        });
        return response.status(201).json({
            success: true,
            message: 'Appointment has been created successfully!!',
            appointment
        });
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: true,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
export const cancelAppointment = async (request, response) => {
    try {
        const { appointmentId } = request.body;
        if (!request.userId) {
            return response.status(405).json({
                success: false,
                error: 'This method not allowed trying to edit user information using ido exception asshole'
            });
        }
        if (!appointmentId) {
            return response.status(400).json({
                error: 'Please choose appointment'
            });
        }
        const appointment = await Appointment.find({ userId: request.userId, _id: appointmentId });
        if (!appointment) {
            return response.status(404).json({
                success: false,
                error: 'Error appointment not found!!'
            });
        }
        return response.status(200).json({
            success: true,
            message: 'Appointment found successfully!!',
            appointment
        });
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}