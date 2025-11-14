import { request, response } from 'express';
export const checkUserAuth = async (request, response) => {
    try {

    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            sucess: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
export const createUserAccount = async (request, response) => {
    try {

    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            sucess: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
export const userLogin = async (request, response) => {
    try {

    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            sucess: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
export const updateUser = async (request, response) => {
    try {

    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            sucess: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
export const verifyEmail = async (request, response) => {
    try {

    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            sucess: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
export const forgotPassword = async (request, response) => {
    try {

    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            sucess: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
export const resetPassword = async (request, response) => {
    try {

    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            sucess: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}
export const logout = async (request, response) => {
    try {
        response.clearCookie('user_token');
        response.status(200).json({
            sucess: true,
            message: 'You have been log out sucessfully!!'
        });
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return response.status(500).json({
            sucess: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
}