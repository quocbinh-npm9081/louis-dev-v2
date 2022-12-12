import dotenv from 'dotenv';
dotenv.config();
import { Connect_mongodb_atlas } from './config/database';
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
// BOOT EXPRESS
const app: Application = express();
const port = 5000;
//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
//CONNECT DB
Connect_mongodb_atlas();
// APPLICATION ROUTING
app.use('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ data: 'HELLO DEV TEAM. LET GET STAETED !!!' });
});

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
