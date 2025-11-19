import { response, request } from "express";
import { Appointment } from "../models/appointment.model.js";
import { Doctor } from "../models/doctor.model.js";
import { cache } from "../config/cache.js";
import { removeCache } from "../utils/RemoveCache.js";
/* For User */
export const createAppointment = async (request, response) => {
    try {
        const { doctorId, date, fees } = request.body;
        if (!request.userId) {
            return response.status(401).json({
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
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return response.status(404).json({
                success: false,
                error: 'Doctor not found'
            });
        }
        const curAppointment = await Appointment.findOne({
            doctorId: doctorId,
            userId: request.userId,
            status: { $in: ['pending'] }
        });
        if (curAppointment) {
            return response.status(400).json({
                success: false,
                error: `Cannot create appointment. You already have a ${curAppointment.status} appointment with this doctor.`
            });
        }
        await removeCache(`appointments-user-${request.userId}`);
        await removeCache(`appointments-doctors-${doctorId}`);
        await removeCache(`latest-appointments-doctors-${doctorId}`);
        const appointment = new Appointment({
            doctorId,
            userId: request.userId,
            date,
            fees
        });
        await appointment.save();
        const populatedAppointment = await Appointment.findById(appointment._id)
            .populate({
                path: 'doctorId',
                select: 'name speciality address profilePicture'
            });
        return response.status(201).json({
            success: true,
            message: 'Appointment has been created successfully!!',
            appointment: populatedAppointment
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
        const appointment = await Appointment.findOne({
            userId: request.userId,
            _id: appointmentId
        });
        if (!appointment) {
            return response.status(404).json({
                success: false,
                error: 'Appointment not found!!'
            });
        }
        if (appointment.status === 'completed') {
            return response.status(400).json({
                success: false,
                error: 'Cannot cancel a completed appointment'
            });
        }
        if (appointment.status === 'cancelled') {
            return response.status(400).json({
                success: false,
                error: 'Appointment is already cancelled'
            });
        }
        appointment.status = 'cancelled';
        await appointment.save();
        await removeCache(`appointments-user-${request.userId}`);
        await removeCache(`appointments-doctors-${appointment.doctorId}`);
        await removeCache(`latest-appointments-doctors-${appointment.doctorId}`);
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
            return response.status(401).json({
                success: false,
                error: 'You need to login'
            });
        }
        const { appointmentId, doctorId } = request.body;
        if (!appointmentId || !doctorId) {
            return response.status(400).json({
                success: false,
                error: 'Appointment ID and Doctor ID are required'
            });
        }
        const appointment = await Appointment.findOne({
            _id: appointmentId,
            userId: request.userId
        });
        if (!appointment) {
            return response.status(404).json({
                success: false,
                error: 'Appointment not found'
            });
        }
        if (appointment.status === 'completed') {
            return response.status(400).json({
                success: false,
                error: 'Appointment is already paid and completed'
            });
        }
        if (appointment.status === 'cancelled') {
            return response.status(400).json({
                success: false,
                error: 'Cannot pay for a cancelled appointment'
            });
        }
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return response.status(404).json({
                success: false,
                error: 'Doctor not found'
            });
        }
        doctor.earning = (doctor.earning || 0) + appointment.fees;
        await doctor.save();
        appointment.status = 'completed';
        appointment.payment = 'online';
        await appointment.save();
        await removeCache(`appointments-user-${request.userId}`);
        await removeCache(`appointments-doctors-${doctorId}`);
        await removeCache(`latest-appointments-doctors-${doctorId}`);
        return response.status(200).json({
            success: true,
            message: 'Payment completed successfully',
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
            return response.status(401).json({
                success: false,
                error: 'You need to login'
            });
        }
        const cacheKey = `appointments-user-${request.userId}`;
        let userAppointments = cache.get(cacheKey);
        if (!userAppointments) {
            userAppointments = await Appointment.find({ userId: request.userId })
                .populate({
                    path: 'doctorId',
                    select: 'name speciality address profilePicture',
                })
                .select(['_id', 'doctorId', 'date', 'fees', 'status', 'payment', 'createdAt'])
                .sort({ createdAt: -1 })
                .lean();
            cache.set(cacheKey, userAppointments, 300);
        }
        return response.status(200).json({
            success: true,
            userAppointments
        });
    } catch (error) {
        console.log('Error in userAppointments:', error instanceof Error ? error.message : error);
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
            return response.status(401).json({
                success: false,
                error: 'Access denied. Doctors only.'
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
            return response.status(401).json({
                success: false,
                error: 'Access denied. Doctors only.'
            });
        }
        const totalPatientsForDoctor = await Appointment.distinct('userId', {
            doctorId: request.doctorId,
            status: { $in: ['pending', 'completed'] }
        });
        return response.status(200).json({
            success: true,
            totalPatientsForDoctor: totalPatientsForDoctor.length
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
            return response.status(401).json({
                success: false,
                error: 'Access denied. Doctors only.'
            });
        }
        const cacheKey = `latest-appointments-doctors-${request.doctorId}`;
        let doctorAppointmentsLimited = cache.get(cacheKey);
        if (!doctorAppointmentsLimited) {
            doctorAppointmentsLimited = await Appointment.find({ doctorId: request.doctorId })
                .populate({
                    path: 'userId',
                    select: 'name profilePicture'
                })
                .select(['_id', 'userId', 'payment', 'date', 'fees', 'status', 'createdAt'])
                .sort({ createdAt: -1 })
                .limit(10);

            cache.set(cacheKey, doctorAppointmentsLimited, 300);
        }
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
            return response.status(401).json({
                success: false,
                error: 'Access denied. Doctors only.'
            });
        }
        const cacheKey = `appointments-doctors-${request.doctorId}`;
        let doctorAppointments = cache.get(cacheKey);
        if (!doctorAppointments) {
            doctorAppointments = await Appointment.find({ doctorId: request.doctorId })
                .populate({
                    path: 'userId',
                    select: 'name profilePicture'
                })
                .select(['_id', 'userId', 'payment', 'date', 'fees', 'status', 'createdAt'])
                .sort({ createdAt: -1 });

            cache.set(cacheKey, doctorAppointments, 300);
        }
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
            return response.status(401).json({
                success: false,
                error: 'Access denied. Doctors only.'
            });
        }
        const { appointmentId } = request.body;
        if (!appointmentId) {
            return response.status(400).json({
                success: false,
                error: 'No appointment selected'
            });
        }
        const appointment = await Appointment.findOne({
            _id: appointmentId,
            doctorId: request.doctorId
        });
        if (!appointment) {
            return response.status(404).json({
                success: false,
                error: 'Appointment not found'
            });
        }
        if (appointment.status === 'completed') {
            return response.status(400).json({
                success: false,
                error: 'Appointment is already completed'
            });
        }
        if (appointment.status === 'cancelled') {
            return response.status(400).json({
                success: false,
                error: 'Cannot accept a cancelled appointment'
            });
        }
        const doctor = await Doctor.findById(request.doctorId);
        if (!doctor) {
            return response.status(404).json({
                success: false,
                error: 'Doctor not found'
            });
        }
        if (appointment.payment !== 'online') {
            doctor.earning = (doctor.earning || 0) + appointment.fees;
            await doctor.save();
        }
        appointment.status = 'completed';
        await appointment.save();
        await removeCache(`appointments-user-${appointment.userId}`);
        await removeCache(`appointments-doctors-${request.doctorId}`);
        await removeCache(`latest-appointments-doctors-${request.doctorId}`);
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
            return response.status(401).json({
                success: false,
                error: 'Access denied. Doctors only.'
            });
        }
        const { appointmentId } = request.body;
        if (!appointmentId) {
            return response.status(400).json({
                success: false,
                error: 'Appointment ID is required'
            });
        }
        const appointment = await Appointment.findOne({
            doctorId: request.doctorId,
            _id: appointmentId
        });
        if (!appointment) {
            return response.status(404).json({
                success: false,
                error: 'Appointment Not Found'
            });
        }
        if (appointment.status === 'completed') {
            return response.status(400).json({
                success: false,
                error: 'Cannot cancel a completed appointment'
            });
        }
        if (appointment.status === 'cancelled') {
            return response.status(400).json({
                success: false,
                error: 'Appointment is already cancelled'
            });
        }
        appointment.status = 'cancelled';
        await appointment.save();
        await removeCache(`appointments-user-${appointment.userId}`);
        await removeCache(`appointments-doctors-${request.doctorId}`);
        await removeCache(`latest-appointments-doctors-${request.doctorId}`);
        return response.status(200).json({
            success: true,
            message: 'Appointment has been cancelled successfully',
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
export const doctorChangeAvailable = async (request, response) => {
    try {
        if (!request.doctorId) {
            return response.status(405).json({
                success: false,
                error: 'Method not allowed this is for doctor only'
            });
        }
        const doctor = await Doctor.findById(request.doctorId);
        if (!doctor) {
            return response.status(404).json({
                success: false,
                error: 'Doctor not found'
            });
        }
        doctor.available = !doctor.available;
        doctor.save();
        return response.status(200).json({
            success: false,
            message: `Doctor status changed to ${doctor.available}`
        });
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: `Internal Server Errror: ${error instanceof Error ? error.message : error}`
        });
    }
}
/**/
/*For Admins*/
export const totalDoctors = async (request, response) => {
    try {
        if (!request.adminId) {
            return response.status(401).json({
                success: false,
                error: 'Access denied. Admins only.'
            });
        }
        const totalDoctors = await Doctor.countDocuments();
        return response.status(200).json({
            success: true,
            totalDoctors
        });
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
export const totalAppointments = async (request, response) => {
    try {
        if (!request.adminId) {
            return response.status(401).json({
                success: false,
                error: 'Access denied. Admins only.'
            });
        }
        const totalAllAppointments = await Appointment.countDocuments();
        return response.status(200).json({
            success: true,
            totalAllAppointments
        });
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
export const totalPatients = async (request, response) => {
    try {
        if (!request.adminId) {
            return response.status(401).json({
                success: false,
                error: 'Access denied. Admins only.'
            });
        }
        const totalAllPatients = await Appointment.distinct('userId');
        return response.status(200).json({
            success: true,
            totalAllPatients: totalAllPatients.length
        });
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
export const latestAppointmentsForDoctors = async (request, response) => {
    try {
        if (!request.adminId) {
            return response.status(401).json({
                success: false,
                error: 'Access denied. Admins only.'
            });
        }
        const cacheKey = 'latest-appointments-admin';
        let appointmentsLimited = cache.get(cacheKey);
        if (!appointmentsLimited) {
            appointmentsLimited = await Appointment.find({})
                .populate({
                    path: 'doctorId',
                    select: 'name profilePicture'
                })
                .populate({
                    path: 'userId',
                    select: 'name profilePicture'
                })
                .select(['_id', 'doctorId', 'userId', 'payment', 'date', 'fees', 'status', 'createdAt'])
                .sort({ createdAt: -1 })
                .limit(10);

            cache.set(cacheKey, appointmentsLimited, 300);
        }
        return response.status(200).json({
            success: true,
            appointmentsLimited
        });
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
export const appointments = async (request, response) => {
    try {
        if (!request.adminId) {
            return response.status(401).json({
                success: false,
                error: 'Access denied. Admins only.'
            });
        }
        const cacheKey = 'all-appointments-admin';
        let allAppointments = cache.get(cacheKey);
        if (!allAppointments) {
            allAppointments = await Appointment.find({})
                .populate([{
                    path: 'userId',
                    select: 'name profilePicture'
                }, {
                    path: 'doctorId',
                    select: 'name profilePicture speciality'
                }])
                .select(['_id', 'userId', 'doctorId', 'payment', 'date', 'fees', 'status', 'createdAt'])
                .sort({ createdAt: -1 });

            cache.set(cacheKey, allAppointments, 300);
        }
        return response.status(200).json({
            success: true,
            allAppointments
        });
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
export const cancelAppointmentForDoctorAndUser = async (request, response) => {
    try {
        if (!request.adminId) {
            return response.status(401).json({
                success: false,
                error: 'Access denied. Admins only.'
            });
        }
        const { appointmentId } = request.body;
        if (!appointmentId) {
            return response.status(400).json({
                success: false,
                error: 'Appointment ID is required'
            });
        }
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return response.status(404).json({
                success: false,
                error: 'Appointment not found'
            });
        }
        if (appointment.status === 'completed') {
            return response.status(400).json({
                success: false,
                error: 'Cannot cancel a completed appointment'
            });
        }
        if (appointment.status === 'cancelled') {
            return response.status(400).json({
                success: false,
                error: 'Appointment is already cancelled'
            });
        }
        appointment.status = 'cancelled';
        await appointment.save();
        removeCache(`appointments-user-${appointment.userId}`);
        removeCache(`appointments-doctors-${appointment.doctorId}`);
        removeCache(`latest-appointments-doctors-${appointment.doctorId}`);
        removeCache('latest-appointments-admin');
        removeCache('all-appointments-admin');
        return response.status(200).json({
            success: true,
            message: 'Appointment cancelled successfully by admin',
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
export const changeAvailable = async (request, response) => {
    try {
        if (!request.adminId) {
            return response.status(405).json({
                success: false,
                error: 'Method not allowed this is for admin only'
            });
        }
        const { doctorId } = request.body;
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return response.status(404).json({
                success: false,
                error: 'Doctor not found'
            });
        }
        doctor.available = !doctor.available;
        doctor.save();
        return response.status(200).json({
            success: false,
            message: `Doctor status changed to ${doctor.available}`
        });
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: `Internal Server Errror: ${error instanceof Error ? error.message : error}`
        });
    }
}
/**/