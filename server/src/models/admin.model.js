import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
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
    profilePicture: {
        type: String,
        default: '/user.png',
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
export const Admin = mongoose.model('Admin', adminSchema);