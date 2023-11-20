import { Router, Request, Response } from 'express';
import * as MouCompanyService from '../service/MouCompanyService';
import { jwtDecode } from 'jwt-decode';
import { generateError } from '../middleware/errorHandler';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const response = await MouCompanyService.getMouCompanyList();

  return res.status(200).send(response);
});

export default router;
