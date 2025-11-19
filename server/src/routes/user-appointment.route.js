import express from 'express';
import { createAppointment, payOnline, userAppointments, userCancelAppointment } from '../controllers/appointment.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { stripe } from '../config/stripe.js';
import 'dotenv/config';
import { Appointment } from '../models/appointment.model.js';
import { Doctor } from '../models/doctor.model.js';
import { removeCache } from '../utils/RemoveCache.js';
const route = express.Router();
route.post('/user-create-appointment', verifyToken('user'), createAppointment);
route.post('/user-cancel-appointment', verifyToken('user'), userCancelAppointment);
route.post('/user-pay-online', verifyToken('user'), payOnline);
route.get('/user-appointments', verifyToken('user'), userAppointments);
route.post('/create-checkout-session', verifyToken('user'), async (request, response) => {
    try {
        const { appointmentId, doctorId, image, name, specail, address, date, fees } = request.body;
        if (fees === undefined || fees === null) {
            console.log('Fees is missing or undefined');
            return response.status(400).json({
                error: 'Fees is required',
                receivedData: request.body
            });
        }
        if (typeof fees !== 'number' || fees <= 0) {
            return response.status(400).json({
                error: 'Fees must be a positive number'
            });
        }
        if (!appointmentId || !doctorId) {
            return response.status(400).json({
                error: 'appointmentId and doctorId are required'
            });
        }
        const productData = {
            name: `Appointment with Dr. ${name || 'Doctor'}`,
            description: `Specialization: ${specail || 'Medical'}, Date: ${date || 'TBD'}`,
        };
        if (image) {
            productData.images = [image];
        }
        const appointment = await Appointment.findById(appointmentId);
        if (appointment.status === 'completed' || appointment.status === 'cancelled') {
            return response.status(400).json({
                success: false,
                error: 'Appointment looks copmlete or cancelled'
            });
        }
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: productData,
                        unit_amount: Math.round(fees * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.SERVER_URL}/change-status-complete?appointmentId=${appointmentId}&doctorId=${doctorId}&fees=${fees}&userId=${request.userId}`,
            cancel_url: `${process.env.CLIENT_URL}?canceled=true`,
            metadata: {
                appointmentId: appointmentId,
                doctorId: doctorId,
                doctorName: name,
            }
        });
        return response.status(200).json({
            url: session.url
        });
    } catch (error) {
        console.log('Stripe error:', error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
});
route.get('/change-status-complete', async (request, response) => {
    try {
        const { appointmentId, doctorId, fees, userId } = request.query;
        if (!appointmentId || !doctorId || !fees || !userId) {
            return response.status(400).json({
                success: false,
                error: 'appointmentId, doctorId and fees are required fields'
            });
        }
        const currentAppointment = await Appointment.findOne({
            userId: userId,
            _id: appointmentId
        });
        if (!currentAppointment) {
            return response.status(404).json({
                success: false,
                error: 'Appointment not found'
            });
        }
        currentAppointment.status = 'completed';
        currentAppointment.payment = 'online';
        await currentAppointment.save();
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return response.status(404).json({
                success: false,
                error: 'Doctor not found'
            });
        }
        const feesAmount = parseFloat(fees);
        doctor.earning = (doctor.earning || 0) + feesAmount;
        await doctor.save();
        await removeCache(`appointments-user-${userId}`);
        await removeCache(`appointments-doctors-${doctorId}`);
        await removeCache(`latest-appointments-doctors-${doctorId}`);
        return response.redirect(`${process.env.CLIENT_URL}/my-appointments`);
    } catch (error) {
        console.log('Error in change-status-complete:', error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
});
export default route;