import express from 'express';
import { createAppointment, payOnline, userAppointments, userCancelAppointment } from '../controllers/appointment.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { stripe } from '../config/stripe.js';
const route = express.Router();
route.post('/user-create-appointment', verifyToken('user'), createAppointment);
route.post('/user-cancel-appointment', verifyToken('user'), userCancelAppointment);
route.post('/user-pay-online', verifyToken('user'), payOnline);
route.get('/user-appointments', verifyToken('user'), userAppointments);
route.post('/create-checkout-session', verifyToken('user'), async (req, res) => {
    try {
        const { appointmentId, doctorId, image, name, specail, address, date, fees } = req.body;
        if (fees === undefined || fees === null) {
            console.log('Fees is missing or undefined');
            return res.status(400).json({
                error: 'Fees is required',
                receivedData: req.body
            });
        }
        if (typeof fees !== 'number' || fees <= 0) {
            return res.status(400).json({
                error: 'Fees must be a positive number'
            });
        }
        const productData = {
            name: `Appointment with Dr. ${name || 'Doctor'}`,
            description: `Specialization: ${specail || 'Medical'}, Date: ${date || 'TBD'}`,
        };
        if (image) {
            productData.images = [image];
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
            success_url: `http://localhost:5173?success=true&appointmentId=${appointmentId || ''}`,
            cancel_url: `http://localhost:5173?canceled=true`,
            metadata: {
                appointmentId: appointmentId || '',
                doctorId: doctorId || '',
                doctorName: name || '',
            }
        });
        return res.status(200).json({
            url: session.url
        });
    } catch (error) {
        console.log('Stripe error:', error instanceof Error ? error.message : error);
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
});
export default route;