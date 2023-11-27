import { Router, Request, Response } from 'express';
import * as MouCompanyService from '../service/MouCompanyService';
import { jwtDecode } from 'jwt-decode';
import { generateError } from '../middleware/errorHandler';
import { Role } from '@prisma/client';
import { BsmUserRole } from 'bsm-oauth';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const response = await MouCompanyService.getMouCompanyList();

  return res.status(200).send(response);
});

router.post('/', async (req: Request, res: Response) => {
  const { authorization } = req.headers;
  const { companyName, detailUrl, profileUrl, category, major } = req.body;

  if (!authorization) {
    generateError({ message: '토큰이 비어 있습니다', status: 403 });
    return;
  }

  const token = authorization.split('Bearer ')[1];
  const decodedJwt = jwtDecode<{ role: Role }>(token);

  if (decodedJwt.role !== BsmUserRole.TEACHER) {
    generateError({ message: '잘못된 접근입니다.', status: 403 });
    return;
  }

  const mouCompany = {
    companyName: companyName,
    detailUrl: detailUrl,
    profileUrl: profileUrl,
    category: category,
    major: major,
  };

  const response = await MouCompanyService.createMouCompany(mouCompany);

  return res.status(200).send(response);
});

router.patch('/:mouCompanyId', async (req: Request, res: Response) => {
  const { authorization } = req.headers;
  const { mouCompanyId } = req.params;
  const { companyName, detailUrl, profileUrl, category, major } = req.body;

  if (!authorization) {
    generateError({ message: '토큰이 비어 있습니다', status: 403 });
    return;
  }

  const token = authorization.split('Bearer ')[1];
  const decodedJwt = jwtDecode<{ role: Role }>(token);

  if (decodedJwt.role !== BsmUserRole.TEACHER) {
    generateError({ message: '잘못된 접근입니다.', status: 403 });
    return;
  }

  const mouCompany = {
    id: Number(mouCompanyId),
    companyName: companyName,
    detailUrl: detailUrl,
    profileUrl: profileUrl,
    category: category,
    major: major,
  };

  const response = await MouCompanyService.updateMouCompany(mouCompany);

  return res.status(200).send(response);
});

router.delete('/:mouCompanyId', async (req: Request, res: Response) => {
  const { mouCompanyId } = req.params;

  const response = await MouCompanyService.deleteMouCompany(Number(mouCompanyId));

  return res.status(200).send(response);
});

export default router;
