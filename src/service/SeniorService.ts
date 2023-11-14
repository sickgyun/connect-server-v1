import { Senior } from '@prisma/client';
import * as SeniotRepository from '../repository/SeniorRepository';

export const createSenior = async (seniorInformation: Senior) => {
  await SeniotRepository.create(seniorInformation);

  return { message: '선배 프로필 작성 성공' };
};

export const getSeniorList = async () => {
  const senior = await SeniotRepository.findMany();

  return { message: '성공', dataList: senior };
};
