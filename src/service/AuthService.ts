import { Role } from '@prisma/client';
import BsmOauth, { BsmUserRole } from 'bsm-oauth';
import jwt from 'jsonwebtoken';
import * as UserRepository from '../repository/AuthRepository';
import getEnvCofigs from '../global/env';

const { BSM_AUTH_CLIENT_ID, BSM_AUTH_CLIENT_SECRET, JWT_SCRECT_KEY } = getEnvCofigs();
const bsmOauth = new BsmOauth(BSM_AUTH_CLIENT_ID, BSM_AUTH_CLIENT_SECRET);

export const loginUser = async (code: string) => {
  const token = await bsmOauth.getToken(code);
  const resource = await bsmOauth.getResource(token);
  const { userCode, profileUrl } = resource;

  if (resource.role === BsmUserRole.STUDENT) {
    const { name, isGraduate, cardinal } = resource.student;
    const userRole: Role = isGraduate ? Role.GRADUATE : Role.STUDENT;

    const userInfo = {
      id: userCode,
      name: name,
      profile_url: profileUrl ?? '',
      role: userRole,
      cardinal: cardinal,
      github_id: '',
    };
    await UserRepository.upsertUser(userInfo);

    const accessToken = jwt.sign({ userCode }, JWT_SCRECT_KEY, { expiresIn: '30m' });

    return {
      message: '로그인 성공',
      data: { accessToken, isGraduate },
    };
  }
};
