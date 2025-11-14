import jwt from 'jsonwebtoken';
export const generateTokenAndSetCookie = (response, id, type) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    if (type == 'user') {
        response.cookie("user_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
    } else if (type == 'admin') {
        response.cookie("admin_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
    }
    else if (type == 'doctor') {
        response.cookie("doctor_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
    }
    else {
        throw new Error('Type is not defined!!');
    }
    return token;
};