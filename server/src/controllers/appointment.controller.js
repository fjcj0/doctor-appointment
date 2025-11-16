import { response, request } from "express";
import { Appointment } from "../models/appointment.model.js";
import { Doctor } from "../models/doctor.model.js";
/*For User*/
export const createAppointment = async (request, response) => {
    try {
        const { doctorId, date, fees } = request.body;
        if (!request.userId) {
            return response.status(400).json({
                success: false,
                error: 'You need to login'
            });
        }
        if (!doctorId || !date || !fees) {
            return response.status(400).json({
                success: false,
                error: 'Doctor, date, and fees fields are required'
            });
        }
        const appointment = new Appointment({
            doctorId,
            userId: request.userId,
            date,
            fees
        });
        await appointment.save();
        return response.status(201).json({
            success: true,
            message: 'Appointment has been created successfully!!',
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
export const userCancelAppointment = async (request, response) => {
    try {
        const { appointmentId } = request.body;
        if (!request.userId) {
            return response.status(401).json({
                success: false,
                error: 'You need to login'
            });
        }
        if (!appointmentId) {
            return response.status(400).json({
                success: false,
                error: 'Please choose appointment'
            });
        }
        const appointment = await Appointment.findOne({ userId: request.userId, _id: appointmentId });
        if (!appointment) {
            return response.status(404).json({
                success: false,
                error: 'Error appointment not found!!'
            });
        }
        appointment.status = 'cancelled';
        await appointment.save();
        return response.status(200).json({
            success: true,
            message: 'Appointment cancelled successfully!!',
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
export const payOnline = async (request, response) => {
    try {
        if (!request.userId) {
            return response.status(405).json({
                success: false,
                error: 'Method not allowed this method only for user'
            });
        }
        const { appointmentId, doctorId } = request.body;
        if (!appointmentId || !doctorId) {
            return response.status(400).json({
                success: false,
                error: 'No doctor or appointment known'
            });
        }
        const appointment = await Appointment.findOne({ _id: appointmentId, userId: request.userId });
        if (!appointment) {
            return response.status(404).json({
                success: false,
                error: 'Appointment not found'
            });
        }
        const doctor = await Doctor.findOne({ _id: doctorId });
        if (!doctor) {
            return response.status(400).json({
                success: false,
                error: 'Doctor not found'
            });
        }
        doctor.earning = (doctor.earning || 0) + appointment.fees;
        await doctor.save();
        appointment.status = 'completed';
        appointment.payment = 'online';
        await appointment.save();
        return response.status(200).json({
            success: true,
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
export const userAppointments = async (request, response) => {
    try {
        if (!request.userId) {
            return response.status(405).json({
                success: false,
                error: 'This method not allowed this method only for users',
            });
        }
        const userAppointments = await Appointment.find({ userId: request.userId })
            .populate('doctorId', ['name', 'speciality', 'address', 'profilePicture'])
            .select(['_id', 'doctorId', 'date', 'fees', 'status', 'payment'])
            .sort({ createdAt: -1 });
        return response.status(200).json({
            success: true,
            userAppointments
        });
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
/**/
/*For Doctors*/
export const totalAppointMentsDoctor = async (request, response) => {
    try {
        if (!request.doctorId) {
            return response.status(405).json({
                success: false,
                error: 'This method not allowed information for doctors only'
            });
        }
        const totalAppointmentsForDoctor = await Appointment.countDocuments({
            doctorId: request.doctorId
        });
        return response.status(200).json({
            success: true,
            totalAppointmentsForDoctor
        });
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
export const totalPatientsForDoctor = async (request, response) => {
    try {
        if (!request.doctorId) {
            return response.status(405).json({
                success: false,
                error: 'This method not allowed information for doctors only'
            });
        }
        const totalPatientsForDoctor = await Appointment.countDocuments({
            doctorId: request.doctorId,
            status: 'pending'
        });
        return response.status(200).json({
            success: true,
            totalPatientsForDoctor
        });
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
export const latestDoctorAppointments = async (request, response) => {
    try {
        if (!request.doctorId) {
            return response.status(405).json({
                success: false,
                error: 'This method not allowed'
            });
        }
        const doctorAppointmentsLimited = await Appointment.find({ doctorId: request.doctorId })
            .populate({
                path: 'userId',
                select: 'name profilePicture'
            })
            .select(['_id', 'userId', 'payment', 'date', 'fees', 'status'])
            .sort({ createdAt: -1 })
            .limit(10);
        return response.status(200).json({
            success: true,
            doctorAppointmentsLimited
        });
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
export const doctorAppointments = async (request, response) => {
    try {
        if (!request.doctorId) {
            return response.status(405).json({
                success: false,
                error: 'This method not allowed'
            });
        }
        const doctorAppointments = await Appointment.find({ doctorId: request.doctorId })
            .populate({
                path: 'userId',
                select: 'name profilePicture'
            })
            .select(['_id', 'userId', 'payment', 'date', 'fees', 'status'])
            .sort({ createdAt: -1 });
        return response.status(200).json({
            success: true,
            doctorAppointments
        });
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
export const doctorAcceptAppointment = async (request, response) => {
    try {
        if (!request.doctorId) {
            return response.status(405).json({
                success: false,
                error: 'Method not allowed this method only for doctors'
            });
        }
        const { appointmendId } = request.body;
        if (!appointmendId) return response.status(400).json({
            success: false,
            error: 'No appointment selected'
        });
        const appointment = await Appointment.findOne({ _id: appointmendId, doctorId: request.doctorId });
        if (!appointment) return response.status(404).json({
            success: false,
            error: 'Appointment not found'
        });
        const doctor = await Doctor.findOne({ _id: request.doctorId });
        if (!doctor) {
            return response.status(400).json({
                success: false,
                error: 'Doctor not found'
            });
        }
        doctor.earning = (doctor.earning || 0) + appointment.fees;
        await doctor.save();
        appointment.status = 'completed';
        await appointment.save();
        return response.status(200).json({
            success: true,
            message: 'Appointment accepted successfully',
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
export const doctorCancelAppointment = async (request, response) => {
    try {
        if (!request.doctorId) {
            return response.status(405).json({
                success: false,
                error: 'This method not allowed this method only for doctors'
            });
        }
        const { appointmentId } = request.body;
        if (!appointmentId) return response.status(400).json({
            success: false,
            error: 'Appointment Id not found'
        });
        const appointment = await Appointment.findOne({ doctorId: request.doctorId, _id: appointmentId });
        if (!appointment) {
            return response.status(404).json({
                success: false,
                error: 'Appointment Not Found'
            });
        }
        appointment.status = 'cancelled';
        await appointment.save();
        return response.status(200).json({
            success: true,
            message: 'Appointment has been cancelled successfully'
        });
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
/**/