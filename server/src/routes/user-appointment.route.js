import express from 'express';
import { createAppointment, payOnline, userAppointments, userCancelAppointment } from '../controllers/appointment.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
const route = express.Router();
route.post('/user-create-appointment', verifyToken('user'), createAppointment);
route.post('/user-cancel-appointment', verifyToken('user'), userCancelAppointment);
route.post('/user-pay-online', verifyToken('user'), payOnline);
route.get('/user-appointments', verifyToken('user'), userAppointments);
export default route;