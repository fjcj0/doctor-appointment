import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
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
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    profilePicture: {
        type: String,
        default: '/user.png',
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    birthday: {
        type: Date,
        default: null
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    phone: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null,
    },
    resetPasswordToken: {
        type: String,
        unique: true
    },
    resetPasswordExpiresAt: Date,
    verificationToken: {
        type: String,
        unique: true
    },
    verificationTokenExpiresAt: Date,
}, { timestamps: true });
export const User = mongoose.model('User', userSchema);