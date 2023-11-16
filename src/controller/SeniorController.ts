import { Router, Request, Response } from 'express';
import * as SeniorService from '../service/SeniorService';
import { jwtDecode } from 'jwt-decode';
import { generateError } from '../middleware/errorHandler';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { authorization } = req.headers;
  const {
    name,
    email,
    bio,
    profileUrl,
    cardinal,
    githubId,
    company,
    position,
    isGraduate,
  } = req.body;

  if (!authorization) {
    generateError({ message: '토큰이 비어 있습니다', status: 403 });
    return;
  }

  if (!isGraduate) {
    generateError({ message: '졸업생이 아닙니다', status: 401 });
    return;
  }

  const token = authorization.split('Bearer ')[1];
  const decodedJwt = jwtDecode<{ userCode: number }>(token);

  const seniorInformation = {
    id: decodedJwt.userCode,
    name: name,
    bio: bio,
    email: email,
    profileUrl: profileUrl,
    cardinal: cardinal,
    githubId: githubId,
    company: company,
    position: position,
    isGraduate: isGraduate,
  };

  const response = await SeniorService.createSenior(seniorInformation);

  return res.status(200).send(response);
});

router.get('/', async (req: Request, res: Response) => {
  const { position } = req.query;

  const response = await SeniorService.getSeniorList(position as string);

  return res.status(200).send(response);
});

router.get('/:userCode', async (req: Request, res: Response) => {
  const { userCode } = req.params;

  const response = await SeniorService.getSenior(Number(userCode));

  return res.status(200).send(response);
});

export default router;
