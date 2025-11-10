import "dotenv/config";
import express, { request, response } from 'express';
import { createServer } from "http";
import chalk from 'chalk';
import { connectDB } from "./lib/db.js";
const app = express();
app.use(express.json());
app.get('/cron', (request, response) => {
    return response.status(200).json({
        message: 'Server connected successfully!!'
    });
});
const server = createServer(app);
connectDB().then(() => {
    server.listen(process.env.PORT, () => {
        console.log(chalk.red('⚡'), chalk.green.bold(`MongoDb connected successfully`));
        console.log(chalk.green('✓'), chalk.blueBright.bold(`Server running at: http://localhost:${process.env.PORT}`));
        console.log(chalk.yellow('★'), chalk.cyan(process.env.NODE_ENV == 'development' ? 'Ready for development' : 'Ready for using'));
    });
}).catch((error) => {
    console.log(error instanceof Error ? error.message : error);
});