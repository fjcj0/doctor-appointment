import rateLimit from 'express-rate-limit';
export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    message: {
        status: 429,
        error: 'Too many requests - please try again after 15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false,
    handler: async (req, res) => {
        res.status(429).json({
            error: 'Rate limit exceeded - too many requests from your IP'
        });
    }
});