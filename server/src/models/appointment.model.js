import mongoose from "mongoose";
const appointmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    },
    date: {
        type: String,
        required: true,
    },
    fees: {
        type: Number,
        required: true
    },
    payment: {
        type: String,
        enum: ['cash', 'online'],
        default: 'cash'
    }
}, { timestamps: true });
export const Appointment = mongoose.model('Appointment', appointmentSchema);