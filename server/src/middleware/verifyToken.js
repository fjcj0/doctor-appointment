import "dotenv/config";
import jwt from 'jsonwebtoken';
export const verifyToken = (type) => {
    return async (request, response, next) => {
        try {
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
            if (!request.cookies) {
                return response.status(401).json({
                    success: false,
                    message: 'Unauthorized - cookies not available'
                });
            }
            const token = request.cookies[config.cookieName];
            if (!token) {
                return response.status(401).json({
                    success: false,
                    message: `Unauthorized - no ${type} token provided`
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
                const idField = config.idField;
                request[idField] = decoded[idField] || decoded.userId || decoded.id;
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
        } catch (error) {
            console.error('Token verification error:', error);
            return response.status(500).json({
                success: false,
                error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
            });
        }
    };
};