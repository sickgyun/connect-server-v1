import { generateError } from '../middleware/errorHandler';
import * as UserRepository from '../repository/UserRepository';

export const getUser = async (userCode: number) => {
  const user = await UserRepository.findOneUser(userCode);

  if (!user) {
    generateError({ message: '권한이 없습니다', status: 403 });
    return;
  }

  return { message: '성공', data: { userInfo: user } };
};
