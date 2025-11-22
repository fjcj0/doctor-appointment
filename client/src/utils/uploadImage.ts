import axios from "axios";
axios.defaults.withCredentials = true;
import toast from "react-hot-toast";
const baseUrl = import.meta.env.MODE === 'development'
    ? 'http://localhost:2340'
    : 'https://doctor-appointment-c217.onrender.com';
export const uploadImage = async (image: File): Promise<void | string> => {
    try {
        const formData = new FormData();
        formData.append('image', image);
        const response = await axios.post(`${baseUrl}/upload-image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (response.status === 200) {
            toast.success('Image uploaded successfully');
            return response.data.image;
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.data?.error) {
            toast.error(error.response.data.error);
        } else if (error instanceof Error) {
            toast.error(error.message);
        } else {
            toast.error(`An unknown error occurred while uploading image ${error instanceof Error ? error.message : error}`);
        }
    }
}