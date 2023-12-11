import { Router, Request, Response } from 'express';
import * as JobPostingService from '../service/JobPostingService';
import asyncify from 'express-asyncify';


const router = asyncify(Router());

router.get('/', async (req: Request, res: Response) => {
  const response = await JobPostingService.getJobList();

  return res.status(200).json(response);
});

export default router;
