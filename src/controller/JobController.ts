import { Router, Request, Response } from 'express';
import * as JobService from '../service/JobService';

const router = Router();

router.get('/jumpit', async (req: Request, res: Response) => {
  const response = await JobService.getJumpitJobList();

  return res.status(200).json(response);
});

router.get('/rallit', async (req: Request, res: Response) => {
  const response = await JobService.getRallitJobList();

  return res.status(200).json(response);
});

export default router;
