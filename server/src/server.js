import "dotenv/config";
import express from 'express';
import { createServer } from "http";
import chalk from 'chalk';
import { connectDB } from "./lib/db.js";
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import job from './config/cron.js';
import authRoute from './routes/user-auth.route.js';
import adminRoute from './routes/admin-auth.route.js';
import doctorRoute from './routes/doctor-auth.route.js';
import userAppointmentRoute from './routes/user-appointment.route.js';
import doctorAppointmentRoute from './routes/doctor-appointment.route.js';
import adminAppointmentRoute from './routes/admin-appointment.route.js';
import cookieParser from 'cookie-parser';
import { uploadImage } from "./lib/uploadImage.js";
import upload from "./config/multer.js";
import mainRoute from './routes/main.route.js';
import { botDetection } from "./utils/botDetection.js";
import { logSlowDownIP, speedLimiter } from "./utils/slowDownLimiter.js";
import { apiProtection } from "./utils/apiProtect.js";
import { limiter } from "./utils/rateLimit.js";
import path from 'path';
const __dirname = path.resolve();
const app = express();
app.set('trust proxy', 1);
app.use(cookieParser());
if (process.env.NODE_ENV !== 'development') job.start();
app.use(express.json());
app.use(botDetection);
app.use(speedLimiter);
app.use(logSlowDownIP);
app.use(limiter);
app.use(apiProtection);
app.use(cors({
    origin: process.env.NODE_ENV === 'development'
        ? 'http://localhost:5173'
        : 'https://doctor-appointment-hsbv.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(morgan('dev'));
app.use(async (error, request, response, next) => {
    response.status(500).json({
        error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
    });
});
app.get('/cron', (request, response) => {
    return response.status(200).json({
        message: 'Server connected successfully!!'
    });
});
app.post('/upload-image', upload.single('image'), uploadImage);
app.use('/api/user-auth', authRoute);
app.use('/api/admin-auth', adminRoute);
app.use('/api/doctor-auth', doctorRoute);
app.use(mainRoute);
app.use(userAppointmentRoute);
app.use(doctorAppointmentRoute);
app.use(adminAppointmentRoute);
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client", "dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
    });
}
const server = createServer(app);
connectDB().then(() => {
    server.listen(process.env.PORT, () => {
        console.log(chalk.green('✓'), chalk.blueBright.bold(`Server running at: http://localhost:${process.env.PORT}`));
        console.log(chalk.yellow('★'), chalk.cyan(process.env.NODE_ENV == 'development' ? 'Ready for development' : 'Ready for using'));
        console.log(chalk.red('🛡️'), chalk.yellow('Universal DDoS protection activated for ALL routes'));
    });
}).catch((error) => {
    console.log(error instanceof Error ? error.message : error);
});