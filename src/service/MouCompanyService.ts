import * as MouCompanyRepository from '../repository/MouCompanyRepository';
import { CreateMouCompany } from '../repository/MouCompanyRepository';

export const getMouCompanyList = async () => {
  const mouComapnayList = await MouCompanyRepository.findMany();

  return { message: '성공', dataList: mouComapnayList };
};

export const createMouCompany = async (mouCompany: CreateMouCompany) => {
  await MouCompanyRepository.create(mouCompany);

  return { message: '성공' };
};
