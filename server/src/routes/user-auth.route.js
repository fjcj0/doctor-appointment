import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import {
    checkUserAuth,
    createUserAccount,
    forgotPassword,
    getCodeResetPassword,
    logoutUser,
    resetPassword,
    updateUser,
    userLogin,
    verifyEmail
} from '../controllers/user-auth.controller.js';
const route = express.Router();
route.post('/create-user-account', createUserAccount);
route.post('/login-user', userLogin);
route.post('/verify-email', verifyEmail);
route.post('/forget-password', forgotPassword);
route.post('/reset-password', resetPassword);
route.post('/get-code-reset-password', getCodeResetPassword);
route.get('/check-user-auth', verifyToken('user'), checkUserAuth);
route.put('/update-user', verifyToken('user'), updateUser);
route.post('/logout-user', verifyToken('user'), logoutUser);
export default route;