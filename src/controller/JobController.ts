import { Router, Request, Response } from 'express';
import * as JobService from '../service/JobService';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const response = await JobService.getJobList();

  return res.status(200).json(response);
});

export default router;
