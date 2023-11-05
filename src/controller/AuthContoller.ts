import { Router } from 'express';
import * as AuthService from '../service/AuthService';
const router = Router();

router.post('/', AuthService.loginUser);

export default router;
