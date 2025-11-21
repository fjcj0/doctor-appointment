import slowDown from 'express-slow-down';
let slowDownIPs = new Set();
export const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 50,
    delayMs: (used) => {
        if (used === 51) {
            console.log(`Slow down activated. Current request count: ${used}`);
        }
        return (used - 50) * 300;
    },
    maxDelayMs: 15000,
});
export const logSlowDownIP = async (req, res, next) => {
    const slowDownInfo = req.slowDown || req.rateLimit || req.slowDownLimit;
    if (slowDownInfo && slowDownInfo.current > 50 && !slowDownIPs.has(req.ip)) {
        console.log(`Slow down activated for IP: ${req.ip} - ${slowDownInfo.current} requests`);
        slowDownIPs.add(req.ip);
        console.log(`Total IPs with slow down: ${slowDownIPs.size}`);
    }
    next();
};