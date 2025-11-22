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
import { limiter } from "./utils/rateLimit.js";
import { speedLimiter } from "./utils/slowDownLimiter.js";
import { apiProtection } from "./utils/apiProtect.js";
import { aj } from "./lib/aj.js";
import path from 'path';
const __dirname = path.resolve();
const app = express();
app.set('trust proxy', 1);
app.use(cookieParser(process.env.COOKIE_SECRET));
if (process.env.NODE_ENV !== 'development') job.start();
app.use(express.json());
app.use(cors({
    origin: process.env.NODE_ENV === 'development'
        ? ['http://localhost:5173']
        : ['https://doctor-appointment-hsbv.onrender.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Cookie', 'Accept'],
    exposedHeaders: ['Set-Cookie'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(morgan('dev'));
app.use(async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 });
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ error: 'Rate limit exceeded, Too many requests!' });
            } else if (decision.reason.isBot()) {
                return res.status(403).json({ error: 'Bot access denied!' });
            } else {
                return res.status(403).json({ error: 'Forbidden' });
            }
        }
        if (decision.results.some(result => result.reason.isBot() && result.reason.isSpoofed())) {
            return res.status(403).json({ error: 'Spoofed bot detected!' });
        }
        next();
    } catch (error) {
        console.log(error.message);
        next(error);
    }
});
/*
const needsProtection = (req) => {
    const protectedPaths = [
        '/api/',
        '/admin-total-doctor',
        '/admin-total-appointment',
        '/admin-total-patient',
        '/admin-latest-appointment',
        '/admin-appointment',
        '/admin-cancel-appointment',
        '/admin-change-doctor-available',
        '/total-appointment-doctor',
        '/total-patient-doctor',
        '/latest-doctor-appointment',
        '/doctor-appointment',
        '/doctor-accept-appointment',
        '/doctor-cancel-appointment',
        '/doctor-change-available',
        '/doctors-limiting',
        '/doctors',
        '/doctor/',
        '/related-doctor/',
        '/user-create-appointment',
        '/user-cancel-appointment',
        '/user-pay-online',
        '/user-appointments',
        '/create-checkout-session',
        '/change-status-complete',
        '/cron',
        '/upload-image'
    ];
    return protectedPaths.some(path => req.path.startsWith(path));
};
app.use(async (req, res, next) => {
    if (needsProtection(req)) {
        botDetection(req, res, next);
    } else {
        next();
    }
});
app.use(async (req, res, next) => {
    if (needsProtection(req)) {
        limiter(req, res, next);
    } else {
        next();
    }
});
app.use(async (req, res, next) => {
    if (needsProtection(req)) {
        speedLimiter(req, res, next);
    } else {
        next();
    }
});
app.use(async (req, res, next) => {
    if (needsProtection(req)) {
        apiProtection(req, res, next);
    } else {
        next();
    }
});
app.get('/cron', (request, response) => {
    return response.status(200).json({
        message: 'Server connected successfully!!'
    });
});
*/
app.get('/', async (request, response) => {
    try {
        return response.status(200).json({
            message: `Message connected sucessfully to server`
        });
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
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
app.use(async (error, request, response, next) => {
    response.status(500).json({
        error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
    });
});
const server = createServer(app);
connectDB().then(() => {
    server.listen(process.env.PORT, () => {
        console.log(chalk.green('✓'), chalk.blueBright.bold(`Server running at: http://localhost:${process.env.PORT}`));
        console.log(chalk.yellow('★'), chalk.cyan(process.env.NODE_ENV == 'development' ? 'Ready for development' : 'Ready for using'));
        console.log(chalk.red('🛡️'), chalk.yellow('DDoS protection activated for protected routes only'));
    });
}).catch((error) => {
    console.log(error instanceof Error ? error.message : error);
});