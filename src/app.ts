import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import AuthController from './controller/AuthController';
import UserController from './controller/UserController';
import StudentProfileController from './controller/StudentProfileController';
import MouCompanyController from './controller/MouCompanyController';

import { errorLogger, errorResponser } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 8088;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/auth', AuthController);
app.use('/user', UserController);
app.use('/student', StudentProfileController);
app.use('/mou-company', MouCompanyController);

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
