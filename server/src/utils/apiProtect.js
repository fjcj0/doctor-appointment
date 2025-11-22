export const apiProtection = async (request, response, next) => {
    const blockedPaths = [
        '/admin', '/phpmyadmin', '/wp-admin',
        '/.env', '/config', '/backup'
    ];
    if (blockedPaths.some(path => request.path.includes(path))) {
        return response.status(404).json({ error: 'Not found' });
    }
    next();
};