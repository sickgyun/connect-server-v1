import { Router } from 'express';
import * as AuthService from '../service/AuthService';
const router = Router();

router.post('/', async (req, res, next) => {
  const { authCode } = req.body;

  const response = await AuthService.loginUser(authCode, next);
  return res.status(200).json(response);
});

export default router;
