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

  if (resource.role === BsmUserRole.STUDENT) {
    const { userCode, profileUrl, email } = resource;
    const { name, isGraduate, cardinal } = resource.student;

    const role: Role = isGraduate ? Role.GRADUATE : Role.STUDENT;

    const userInformarion = {
      userCode: userCode,
      name: name,
      email: email,
      profileUrl: profileUrl ?? '',
      role: role,
      cardinal: cardinal,
      isGraduate: isGraduate,
    };

    await UserRepository.upsert(userInformarion);

    const accessToken = jwt.sign({ userCode, role }, JWT_SECRET_KEY, {
      expiresIn: '30m',
    });

    return { message: '로그인 성공', data: { accessToken, isGraduate } };
  }
  if (resource.role === BsmUserRole.TEACHER) {
    const { userCode, profileUrl, email, role } = resource;
    const { name } = resource.teacher;

    const userInformarion = {
      userCode: userCode,
      name: name,
      email: email,
      profileUrl: profileUrl ?? '',
      role: role,
      isGraduate: false,
      cardinal: 0,
    };

    await UserRepository.upsert(userInformarion);

    const accessToken = jwt.sign({ userCode, role }, JWT_SECRET_KEY, {
      expiresIn: '30m',
    });

    return { message: '로그인 성공', data: { accessToken } };
  }
};
