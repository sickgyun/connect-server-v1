import * as MouCompanyRepository from '../repository/MouCompanyRepository';

export const getMouCompanyList = async () => {
  const mouComapnayList = await MouCompanyRepository.findMany();

  return { message: '성공', dataList: mouComapnayList };
};
