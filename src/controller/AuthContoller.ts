import { Router, Request, Response, NextFunction } from 'express';
import { generateError } from '../middleware/errorHandler';
import * as AuthService from '../service/AuthService';
import asyncify from 'express-asyncify';

const router = asyncify(Router());

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const { code } = req.query;

  if (!code) return generateError({ status: 400, message: '잘못된 요청' });

  const response = await AuthService.loginUser(code as string);
  return res.status(200).send(response);
});

export default router;
