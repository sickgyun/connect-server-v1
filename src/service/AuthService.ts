import { Role } from '@prisma/client';
import BsmOauth, { BsmUserRole } from 'bsm-oauth';
import jwt from 'jsonwebtoken';
import * as UserRepository from '../repository/UserRepository';
import getEnvCofigs from '../global/env';
import { generateError } from '../middleware/errorHandler';

const { BSM_AUTH_CLIENT_ID, BSM_AUTH_CLIENT_SECRET, JWT_SECRET_KEY } = getEnvCofigs();
const bsmOauth = new BsmOauth(BSM_AUTH_CLIENT_ID, BSM_AUTH_CLIENT_SECRET);

export const login = async (code: string) => {
  const token = await bsmOauth.getToken(code);

  if(!token) {
    generateError({message: "토큰이 없습니다.", status: 400})
  }

  const resource = await bsmOauth.getResource(token);

  if (resource.role === BsmUserRole.STUDENT) {
    const { userCode, profileUrl, email } = resource;
    const { name, isGraduate, cardinal } = resource.student;

    const userRole: Role = isGraduate ? Role.GRADUATE : Role.STUDENT;

    const userInformarion = {
      userCode: userCode,
      name: name,
      email: email,
      profileUrl: profileUrl ?? '',
      role: userRole,
      cardinal: cardinal,
      isGraduate: isGraduate,
    };

    await UserRepository.upsert(userInformarion);

    const accessToken = jwt.sign({ userCode }, JWT_SECRET_KEY, {
      expiresIn: '30m',
    });

    return { message: '로그인 성공', data: { accessToken, isGraduate } };
  }
};
