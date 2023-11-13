import { Role } from '@prisma/client';
import BsmOauth, { BsmUserRole } from 'bsm-oauth';
import jwt from 'jsonwebtoken';
import * as UserRepository from '../repository/UserRepository';
import getEnvCofigs from '../global/env';

const { BSM_AUTH_CLIENT_ID, BSM_AUTH_CLIENT_SECRET, JWT_SECRET_KEY } = getEnvCofigs();
const bsmOauth = new BsmOauth(BSM_AUTH_CLIENT_ID, BSM_AUTH_CLIENT_SECRET);

export const login = async (code: string) => {
  const token = await bsmOauth.getToken(code);
  const resource = await bsmOauth.getResource(token);
  const { userCode, profileUrl, email } = resource;

  if (resource.role === BsmUserRole.STUDENT) {
    const { name, isGraduate, cardinal } = resource.student;
    const userRole: Role = isGraduate ? Role.GRADUATE : Role.STUDENT;

    const userInfo = {
      id: userCode,
      name,
      email,
      profileUrl: profileUrl ?? '',
      role: userRole,
      cardinal,
      githubId: '',
      company: '',
      isGraduate,
    };
    await UserRepository.upsertUser(userInfo);

    const accessToken = jwt.sign({ userCode }, JWT_SECRET_KEY, { expiresIn: '30m' });

    return { message: '로그인 성공', data: { accessToken, isGraduate } };
  }
};
