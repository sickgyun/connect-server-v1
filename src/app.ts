import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import AuthController from './controller/AuthController';
import UserController from './controller/UserController';
import StudentProfileController from './controller/StudentProfileController';
import MouCompanyController from './controller/MouCompanyController';
import JobPostingController from './controller/JobPostingontroller';

import { errorLogger, errorResponser } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 8088;

app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/auth', AuthController);
app.use('/user', UserController);
app.use('/student-profile', StudentProfileController);
app.use('/mou-company', MouCompanyController);
app.use('/job-posting', JobPostingController);

app.use(errorLogger);
app.use(errorResponser);

app.listen(PORT, () => {
  console.log(`
  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  ┃   Server listening on port: ${PORT}    ┃
  ┃     http://localhost:${PORT}           ┃
  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  `);
});
