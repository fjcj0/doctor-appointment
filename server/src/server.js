import "dotenv/config";
import express from 'express';
import { createServer } from "http";
import chalk from 'chalk';
import { connectDB } from "./lib/db.js";
import { aj } from './lib/aj.js';
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
import path from 'path';
const __dirname = path.resolve();
const app = express();
app.set('trust proxy', true);
app.use(cookieParser());
if (process.env.NODE_ENV !== 'development') job.start();
app.use(express.json());
app.use(cors({
    origin: process.env.NODE_ENV === 'development'
        ? 'http://localhost:5173'
        : 'https://doctor-appointment-s43v.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(morgan('dev'));
app.use(async (req, res, next) => {
    try {
        if (process.env.NODE_ENV === 'development' && !process.env.ARCJET_KEY) {
            return next();
        }
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
        console.log('Arcjet protection error:', error.message);
        next();
    }
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
    });
}).catch((error) => {
    console.log(error instanceof Error ? error.message : error);
});