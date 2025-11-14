import mongoose from "mongoose";
import chalk from 'chalk';
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(chalk.red('⚡'), chalk.green.bold(`MongoDb connected successfully`));
    } catch (error) {
        throw new Error(error);
    }
};