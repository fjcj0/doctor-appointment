import express from 'express';
import { doctor, doctors, doctors_limiting } from '../controllers/main.controller.js';
const route = express.Router();
route.get('/doctors-limiting', doctors_limiting);
route.get('/doctors', doctors);
route.get('/doctor/:id', doctor);
export default route;