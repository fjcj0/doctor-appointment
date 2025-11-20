import { request, response } from 'express';
import { User } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from '../mail/emails.js';
import { isEmailExist } from '../utils/isEmailExist.js';
export const checkUserAuth = async (request, response) => {
    try {
        const user = await User.findById(request.userId).select('-password');
        if (!user) {
            return response.status(404).json({ success: false, message: 'error no user is authenticated!!' });
        }
        return response.status(200).json(
            {
                success: true,
                user: {
                    ...user._doc,
                    password: undefined,
                    resetPasswordToken: undefined,
                    verificationToken: undefined,
                    verificationTokenExpiresAt: undefined,
                    resetPasswordExpiresAt: undefined
                }
            }
        );
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
export const createUserAccount = async (request, response) => {
    try {
        const { email, name, password, gender } = request.body;
        if (!email || !name || !password || !gender) {
            return response.status(400).json({
                success: false,
                error: 'All fields are required!!'
            });
        }
        const emailExists = await isEmailExist(email);
        if (emailExists) return response.status(405).json({
            success: false,
            error: 'Email is already used try another one!!'
        });
        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(1000 + Math.random() * 9000).toString();
        const user = new User({
            email,
            name,
            password: hashedPassword,
            gender,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        });
        await user.save();
        generateTokenAndSetCookie(response, user._id, 'user');
        await sendVerificationEmail(email, verificationToken);
        return response.status(201).json({
            success: true,
            message: `Check your email ${email} to enter the verification code!!`
        });
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
export const userLogin = async (request, response) => {
    try {
        const { email, password } = request.body;
        const user = await User.findOne({ email });
        if (!user) {
            return response.status(404).json({
                success: false,
                error: 'User not found!!'
            });
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return response.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }
        generateTokenAndSetCookie(response, user._id, 'user');
        if (!user.isVerified) {
            const verificationToken = Math.floor(1000 + Math.random() * 9000).toString();
            user.verificationToken = verificationToken;
            user.verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000;
            await user.save();
            await sendVerificationEmail(email, verificationToken);
            return response.status(203).json({
                success: true,
                message: `Verify code sent to email ${email}`
            });
        }
        user.lastLogin = Date.now();
        await user.save();
        return response.status(200).json({
            success: true,
            message: 'Login successfully!!',
            user: {
                ...user._doc,
                password: undefined,
                resetPasswordToken: undefined,
                verificationToken: undefined,
                verificationTokenExpiresAt: undefined,
                resetPasswordExpiresAt: undefined
            }
        });
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
export const updateUser = async (request, response) => {
    try {
        const { image, name, phone, address, gender, birthday } = request.body;
        if (!image && !name && !phone && !address && !gender && !birthday) {
            return response.status(400).json({
                success: false,
                error: 'At least one field!!'
            });
        }
        if (!gender || !name) {
            return response.status(400).json({
                success: false,
                error: 'Gender and name are required fields!!'
            });
        }
        const user = await User.findById(request.userId);
        if (!user) {
            return response.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        user.name = name;
        user.profilePicture = image;
        user.phone = phone;
        user.address = address;
        user.gender = gender;
        user.birthday = birthday;
        await user.save();
        return response.status(200).json({
            success: true,
            message: 'User data has been updated successfully!!',
            user: {
                ...user._doc,
                password: undefined,
                resetPasswordToken: undefined,
                verificationToken: undefined,
                verificationTokenExpiresAt: undefined,
                resetPasswordExpiresAt: undefined
            },
        });
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
export const verifyEmail = async (request, response) => {
    try {
        const { code } = request.body;
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() },
        });
        if (!user) {
            return response.status(401).json({
                success: false,
                error: 'Unauthorized maybe code is expired or code invalid'
            });
        }
        user.isVerified = true;
        user.verificationTokenExpiresAt = undefined;
        user.verificationToken = undefined;
        await user.save();
        await sendWelcomeEmail(user.email, user.name);
        return response.status(200).json({
            success: true,
            message: `Welcome ${user.name}`,
            user: {
                ...user._doc,
                password: undefined,
                resetPasswordToken: undefined,
                verificationToken: undefined,
                verificationTokenExpiresAt: undefined,
                resetPasswordExpiresAt: undefined
            },
        });
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
export const forgotPassword = async (request, response) => {
    try {
        const { email } = request.body;
        const user = await User.findOne({ email });
        if (!user) return response.status(404).json({
            success: false,
            error: 'User is not exist'
        });
        const resetToken = Math.floor(1000 + Math.random() * 9000).toString();
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;
        await user.save();
        await sendPasswordResetEmail(email, resetToken);
        return response.status(200).json({
            success: true,
            message: `Code sent successfully to your email ${email}`
        });
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
export const getCodeResetPassword = async (request, response) => {
    try {
        const { code } = request.body;
        if (!code) {
            return response.status(400).json({
                success: false,
                error: 'Code is required'
            });
        }
        const user = await User.findOne({ resetPasswordToken: code });
        if (!user) {
            return response.status(400).json({
                success: false,
                error: 'Code invaild or maybe is expired'
            });
        }
        return response.status(200).json({
            success: true,
            message: 'Code is valid'
        });
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
export const resetPassword = async (request, response) => {
    try {
        const { token, password } = request.body;
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        });
        if (!user) {
            return response.status(401).json({
                success: false,
                error: 'Unauthorized maybe code is expired or code invalid'
            });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordExpiresAt = undefined;
        user.resetPasswordToken = undefined;
        await user.save();
        await sendResetSuccessEmail(user.email);
        return response.status(200).json(
            {
                success: true,
                message: 'Password has been changed successfully!!',
                user: {
                    ...user._doc,
                    password: undefined,
                    resetPasswordToken: undefined,
                    verificationToken: undefined,
                    verificationTokenExpiresAt: undefined,
                    resetPasswordExpiresAt: undefined
                }
            });
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
export const logoutUser = async (request, response) => {
    try {
        response.clearCookie('user_token');
        response.status(200).json({
            success: true,
            message: 'You have been log out successfully!!'
        });
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}