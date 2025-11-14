import { Doctor } from '../models/doctor.model.js';
import { Admin } from '../models/admin.modal.js';
import { User } from '../models/user.model.js';
export const isEmailExist = async (email) => {
    const isEmailExistAtUser = await User.findOne({ email });
    const isEmailExistAtDoctor = await Doctor.findOne({ email });
    const isEmailExistAtAdmin = await Admin.findOne({ email });
    if (isEmailExistAtAdmin || isEmailExistAtUser || isEmailExistAtDoctor) return true;
    return false;
}