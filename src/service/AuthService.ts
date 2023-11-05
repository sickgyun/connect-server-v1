import { Role } from '@prisma/client';
import BsmOauth, { BsmOauthError, BsmOauthErrorType, BsmUserRole } from 'bsm-oauth';
import { NextFunction, Request, Response } from 'express';
import {
  BadRequestException,
  ForbiddenException,
  InternalServerException,
} from '../global/exception';
import jwt from 'jsonwebtoken';
import * as UserRepository from '../repository/AuthRepository';

const BSM_AUTH_CLIENT_ID = process.env.CLIENT_ID || '';
const BSM_AUTH_CLIENT_SECRET = process.env.CLIENT_SECRET || '';

console.log(BSM_AUTH_CLIENT_SECRET);
const SCRECT_KEY = process.env.SCRECT_KEY!;
const bsmOauth = new BsmOauth(BSM_AUTH_CLIENT_ID, BSM_AUTH_CLIENT_SECRET);

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const authCode = req.query.code;
  try {
    if (!authCode) return next(new BadRequestException());
    const token = await bsmOauth.getToken(authCode as string);
    const resource = await bsmOauth.getResource(token);
    const { userCode, profileUrl } = resource;
    if (resource) {
      if (resource.role === BsmUserRole.STUDENT) {
        const { name, grade } = resource.student;
        let userRole: Role = 'STUDENT';
        // 졸업생이면
        if (grade === 0) {
          userRole = 'GRADUATE';
        }
        const userInfo = {
          id: userCode,
          name: name,
          profile_url: profileUrl,
          role: userRole,
          github_id: '',
          semester: 0,
        };
        await UserRepository.upsertUser(userInfo);
      } else {
        return next(new ForbiddenException());
      }
      const jwtToken = jwt.sign({ userCode }, SCRECT_KEY, { expiresIn: '30m' });
      return res.status(200).json({
        message: '로그인 성공',
        data: { accessToken: jwtToken, refreshToken: jwtToken },
      });
    }
  } catch (error) {
    if (error instanceof BsmOauthError) {
      switch (error.type) {
        case BsmOauthErrorType.INVALID_CLIENT: {
          next(new InternalServerException());
          break;
        }
        case BsmOauthErrorType.AUTH_CODE_NOT_FOUND: {
          next(new BadRequestException());
          break;
        }
        case BsmOauthErrorType.TOKEN_NOT_FOUND: {
          next(new InternalServerException());
          break;
        }
      }
    } else {
      next(new InternalServerException());
    }
  }
};
