import * as UAParser from 'ua-parser-js';
const allowedBrowsers = [
    'Chrome', 'Firefox', 'Opera', 'Safari', 'Edge', 'Tor Browser'
];
const allowedMobileBrowsers = [
    'Mobile Chrome', 'Mobile Firefox', 'Mobile Safari', 'Mobile Edge'
];
const suspiciousKeywords = [
    'bot', 'crawler', 'spider', 'scraper', 'monitor', 'checker'
];
export const botDetection = async (request, response, next) => {
    try {
        if (request.method === 'OPTIONS') {
            return next();
        }
        const uaString = request.headers['user-agent'] || '';
        if (!uaString) {
            return next();
        }
        const parser = new UAParser.UAParser(uaString);
        const ua = parser.getResult();
        const browser = ua.browser.name || "Unknown";
        const engine = ua.engine.name || "";
        const extendedAllowedBrowsers = [
            ...allowedBrowsers,
            'Chromium', 'Brave', 'Vivaldi', 'Samsung Browser'
        ];
        const extendedAllowedMobileBrowsers = [
            ...allowedMobileBrowsers,
            'Mobile Brave', 'Mobile Samsung'
        ];
        const isAllowedBrowser = extendedAllowedBrowsers.includes(browser) ||
            extendedAllowedMobileBrowsers.includes(browser);
        if (!isAllowedBrowser) {
            console.log(`Blocked browser: ${browser}`);
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
            console.log('Suspicious engine detected');
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