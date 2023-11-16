import { StudenProfile } from '@prisma/client';
import * as StudentRepository from '../repository/StudentProfileRepository';
import { generateError } from '../middleware/errorHandler';

export const createStudentProfile = async (studentProfile: StudenProfile) => {
  const isValidStudent = await StudentRepository.findUnique(studentProfile.userCode);

  if (isValidStudent) {
    generateError({ message: '이미 프로필이 존재합니다.', status: 409 });
    return;
  }

  await StudentRepository.create(studentProfile);

  return { message: '프로필 작성 성공' };
};

export const getStudentProfile = async (userCode: number) => {
  const student = await StudentRepository.findUnique(userCode);

  return { message: '성공', data: student };
};

export const getStudentProfileList = async (position: string) => {
  const student = await StudentRepository.findMany(position);

  return { message: '성공', dataList: student };
};
