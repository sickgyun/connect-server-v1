import { Router, Request, Response } from 'express';
import { generateError } from '../middleware/errorHandler';
import * as UserService from '../service/UserService';
import { jwtDecode } from 'jwt-decode';
import asyncify from 'express-asyncify';

const router = asyncify(Router());

router.get('/', async (req: Request, res: Response) => {
  const { authorization } = req.headers;

  if (!authorization) {
    generateError({ message: '토큰이 비어 있습니다', status: 403 });
    return;
  }

  const decodedJwt = jwtDecode<{ userCode: number }>(authorization);

  const response = await UserService.getUser(decodedJwt.userCode);

  return res.status(200).send(response);
});

router.patch('/', async (req: Request, res: Response) => {
  const { authorization } = req.headers;
  const { email, githubId } = req.body;

  if (!authorization) {
    generateError({ message: '토큰이 비어 있습니다', status: 403 });
    return;
  }

  const decodedJwt = jwtDecode<{ userCode: number }>(authorization);

  const userInformation = {
    userCode: decodedJwt.userCode,
    email: email,
    githubId: githubId,
  };

  const response = await UserService.updateUser(userInformation);

  return res.status(200).send(response);
});

export default router;
