import mongoose from "mongoose";
const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    speciality: {
        type: String,
        required: true,
        enum: ['General Physician', 'Cardiologist', 'Neurologist', 'Pediatrician', 'Orthopedic Surgeon', 'Dermatologist'],
    },
    Degree: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        default: null,
    },
    profilePicture: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
        enum: ['1 Year', '2 Years', '3 Years', '4 Years', '5 Years', '6 Years', '7 Years', '8 Years', '9 Years', '10+ Years']
    },
    fees: {
        type: Number,
        required: true
    },
    about: {
        type: String,
        required: true,
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
export const Doctor = mongoose.model('Doctor', doctorSchema);