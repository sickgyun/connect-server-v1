import { Senior } from '@prisma/client';
import * as SeniotRepository from '../repository/SeniorRepository';
import { generateError } from '../middleware/errorHandler';

export const createSenior = async (seniorInformation: Senior) => {
  const validSenior = await SeniotRepository.findUnique(seniorInformation.id);

  if (validSenior) {
    generateError({ message: '이미 존재하는 Senior입니다.', status: 409 });
    return;
  }

  await SeniotRepository.create(seniorInformation);

  return { message: '선배 프로필 작성 성공' };
};

export const getSeniorList = async () => {
  const senior = await SeniotRepository.findMany();

  return { message: '성공', dataList: senior };
};
