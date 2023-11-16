import { Senior } from '@prisma/client';
import * as SeniotRepository from '../repository/SeniorRepository';
import { generateError } from '../middleware/errorHandler';

export const createSenior = async (seniorInformation: Senior) => {
  const isValidSenior = await SeniotRepository.findUnique(seniorInformation.userCode);

  if (isValidSenior) {
    generateError({ message: '이미 존재하는 Senior입니다.', status: 409 });
    return;
  }

  await SeniotRepository.create(seniorInformation);

  return { message: '선배 프로필 작성 성공' };
};

export const getSenior = async (userCode: number) => {
  const senior = await SeniotRepository.findUnique(userCode);

  return { message: '성공', data: senior };
};

export const getSeniorList = async (position: string) => {
  const senior = await SeniotRepository.findMany(position);

  return { message: '성공', dataList: senior };
};
