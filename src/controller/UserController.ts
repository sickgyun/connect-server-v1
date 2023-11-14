import { Router, Request, Response } from 'express';
import { generateError } from '../middleware/errorHandler';
import * as UserService from '../service/UserService';
import { jwtDecode } from 'jwt-decode';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const { authorization } = req.headers;

  if (!authorization) {
    generateError({ message: '토큰이 비어 있습니다', status: 403 });
    return;
  }

  const token = authorization.split('Bearer ')[1];
  const decodedJwt = jwtDecode<{ userCode: number }>(token);

  const response = await UserService.getUserInformation(decodedJwt.userCode);

  return res.status(200).send(response);
});

router.put('/update', async (req: Request, res: Response) => {
  const { authorization } = req.headers;
  const { email, company, githubId } = req.body;

  if (!authorization) {
    generateError({ message: '토큰이 비어 있습니다', status: 403 });
    return;
  }

  const token = authorization.split('Bearer ')[1];
  const decodedJwt = jwtDecode<{ userCode: number }>(token);

  const userInformation = {
    id: decodedJwt.userCode,
    email: email,
    company: company,
    githubId: githubId,
  };

  const response = await UserService.updateUserInformation(userInformation);

  return res.status(200).send(response);
});

export default router;
