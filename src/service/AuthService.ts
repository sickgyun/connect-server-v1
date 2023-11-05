import { Role } from '@prisma/client';
import BsmOauth, { BsmOauthError, BsmOauthErrorType, BsmUserRole } from 'bsm-oauth';
import { NextFunction } from 'express';
import {
  BadRequestException,
  ForbiddenException,
  InternalServerException,
} from '../global/exception';
import jwt from 'jsonwebtoken';
import * as UserRepository from '../repository/AuthRepository';
import getEnvCofigs from '../global/env';

const { BSM_AUTH_CLIENT_ID, BSM_AUTH_CLIENT_SECRET, JWT_SCRECT_KEY } = getEnvCofigs();
const bsmOauth = new BsmOauth(BSM_AUTH_CLIENT_ID, BSM_AUTH_CLIENT_SECRET);

export const loginUser = async (authCode: string, next: NextFunction) => {
  try {
    if (!authCode) return next(new BadRequestException());
    const token = await bsmOauth.getToken(authCode as string);
    const resource = await bsmOauth.getResource(token);
    const { userCode, profileUrl } = resource;
    if (resource) {
      if (resource.role === BsmUserRole.STUDENT) {
        const { name, grade } = resource.student;
        let userRole: Role = Role.STUDENT;
        // 졸업생이면
        if (grade === 0) {
          userRole = Role.GRADUATE;
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
      const jwtToken = jwt.sign({ userCode }, JWT_SCRECT_KEY, { expiresIn: '30m' });
      return {
        message: '로그인 성공',
        data: { accessToken: jwtToken, refreshToken: jwtToken },
      };
    }
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
};
