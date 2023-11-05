import { BsmOauthError, BsmOauthErrorType } from 'bsm-oauth';
import { Router } from 'express';
import { BadRequestException, InternalServerException } from '../global/exception';
import * as AuthService from '../service/AuthService';
const router = Router();

router.post('/', async (req, res, next) => {
  const { authCode } = req.body;

  try {
    const response = await AuthService.loginUser(authCode);
    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof BsmOauthError) {
      switch (error.type) {
        case BsmOauthErrorType.INVALID_CLIENT: {
          return next(new InternalServerException());
        }
        case BsmOauthErrorType.AUTH_CODE_NOT_FOUND: {
          return next(new BadRequestException());
        }
        case BsmOauthErrorType.TOKEN_NOT_FOUND: {
          return next(new InternalServerException());
        }
      }
    } else {
      return next(new InternalServerException());
    }
  }
});

export default router;
