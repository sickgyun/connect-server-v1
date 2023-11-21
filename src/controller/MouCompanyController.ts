import { Router, Request, Response } from 'express';
import * as MouCompanyService from '../service/MouCompanyService';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const response = await MouCompanyService.getMouCompanyList();

  return res.status(200).send(response);
});

router.post('/', async (req: Request, res: Response) => {
  const { companyName, detailUrl, profileUrl, category, major } = req.body;

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
  const { mouCompanyId } = req.params;
  const { companyName, detailUrl, profileUrl, category, major } = req.body;

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
