import jwt from 'jsonwebtoken';
export const verifyToken = async (request, response, next, type) => {
    const tokenConfigs = {
        user: {
            cookieName: 'user_token',
            idField: 'userId'
        },
        admin: {
            cookieName: 'admin_token',
            idField: 'adminId'
        },
        doctor: {
            cookieName: 'doctor_token',
            idField: 'doctorId'
        }
    };
    const config = tokenConfigs[type];
    if (!config) {
        return response.status(400).json({
            success: false,
            message: 'Invalid token type'
        });
    }
    const token = request.cookies[config.cookieName];
    if (!token) {
        return response.status(401).json({
            success: false,
            message: 'Unauthorized - no token provided'
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return response.status(401).json({
                success: false,
                message: 'Unauthorized - invalid token'
            });
        }
        request[config.idField] = decoded[config.idField] || decoded.userId;
        next();
    } catch (error) {
        let statusCode = 401;
        let message = 'Unauthorized - invalid token';
        if (error.name === 'TokenExpiredError') {
            message = 'Token expired';
        } else if (error.name === 'JsonWebTokenError') {
            message = 'Invalid token';
        } else {
            statusCode = 400;
            message = error.message;
        }
        return response.status(statusCode).json({
            success: false,
            message
        });
    }
};