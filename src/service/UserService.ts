import { generateError } from '../middleware/errorHandler';
import * as UserRepository from '../repository/UserRepository';
import { UpdateUser } from '../repository/UserRepository';

export const getUserInformation = async (userCode: number) => {
  const user = await UserRepository.findOne(userCode);

  if (!user) {
    generateError({ message: '권한이 없습니다', status: 403 });
    return;
  }

  return { message: '성공', data: { ...user } };
};

export const updateUserInformation = async (userInformation: UpdateUser) => {
  await UserRepository.update(userInformation);

  return { message: '프로필 업데이트 성공' };
};
