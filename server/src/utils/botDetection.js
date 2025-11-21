import * as UAParser from 'ua-parser-js';
const allowedBrowsers = [
    'Chrome', 'Firefox', 'Opera', 'Safari', 'Edge', 'Tor Browser'
];
const suspiciousKeywords = [
    'bot', 'crawler', 'spider', 'scraper', 'monitor', 'checker'
];
export const botDetection = async (request, response, next) => {
    try {
        const uaString = request.headers['user-agent'] || '';
        const parser = new UAParser.UAParser(uaString);
        const ua = parser.getResult();
        const browser = ua.browser.name || "Unknown";
        const engine = ua.engine.name || "";
        if (!allowedBrowsers.includes(browser)) {
            return response.status(403).json({
                error: `Access denied: Unsupported browser - ${browser}`
            });
        }
        const lowerUA = uaString.toLowerCase();
        if (suspiciousKeywords.some(keyword => lowerUA.includes(keyword))) {
            return response.status(403).json({
                error: 'Bot activity detected'
            });
        }
        if (!engine || engine === '') {
            return response.status(403).json({
                error: 'Suspicious browser engine detected'
            });
        }
        next();
    } catch (error) {
        console.log('Bot detection error:', error);
        next();
    }
}