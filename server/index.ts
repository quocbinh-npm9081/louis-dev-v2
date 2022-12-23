import dotenv from 'dotenv';
dotenv.config();
import { Connect_mongodb_atlas } from './config/database';
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import routes from './routes';
// BOOT EXPRESS
const app: Application = express();
const port = 9999;
//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
//CONNECT DB
Connect_mongodb_atlas();
// APPLICATION ROUTING
routes(app);

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
