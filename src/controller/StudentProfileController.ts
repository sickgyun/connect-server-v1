import { Router, Request, Response } from 'express';
import * as StudentProfileService from '../service/StudentProfileService';
import { jwtDecode } from 'jwt-decode';
import { generateError } from '../middleware/errorHandler';

const router = Router();

router.post('/profile', async (req: Request, res: Response) => {
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

  const token = authorization.split('Bearer ')[1];
  const decodedJwt = jwtDecode<{ userCode: number }>(token);

  const studentProfile = {
    userCode: decodedJwt.userCode,
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

  const response = await StudentProfileService.createStudentProfile(studentProfile);

  return res.status(200).send(response);
});

router.get('/profile', async (req: Request, res: Response) => {
  const { position } = req.query;

  const response = await StudentProfileService.getStudentProfileList(position as string);

  return res.status(200).send(response);
});

router.get('/profile/:userCode', async (req: Request, res: Response) => {
  const { userCode } = req.params;

  const response = await StudentProfileService.getStudentProfile(Number(userCode));

  return res.status(200).send(response);
});

router.patch('/profile', async (req: Request, res: Response) => {
  const { authorization } = req.headers;
  const { bio, email, company, position } = req.body;

  if (!authorization) {
    generateError({ message: '토큰이 비어 있습니다', status: 403 });
    return;
  }

  const token = authorization.split('Bearer ')[1];
  const decodedJwt = jwtDecode<{ userCode: number }>(token);

  const studentProfile = {
    userCode: decodedJwt.userCode,
    bio: bio,
    email: email,
    company: company,
    position: position,
  };

  const response = await StudentProfileService.updateStudentProfile(studentProfile);

  return res.status(200).send(response);
});

export default router;
