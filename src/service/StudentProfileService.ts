import { StudenProfile } from '@prisma/client';
import * as StudentProfileRepository from '../repository/StudentProfileRepository';
import { generateError } from '../middleware/errorHandler';

export const createStudentProfile = async (studentProfile: StudenProfile) => {
  const isValidStudent = await StudentProfileRepository.findUnique(
    studentProfile.userCode
  );

  if (isValidStudent) {
    generateError({ message: '이미 프로필이 존재합니다.', status: 409 });
    return;
  }

  await StudentProfileRepository.create(studentProfile);

  return { message: '프로필 작성 성공' };
};

export const getStudentProfile = async (userCode: number) => {
  const student = await StudentProfileRepository.findUnique(userCode);

  return { message: '성공', data: student };
};

export const getStudentProfileList = async (position: string) => {
  const student = await StudentProfileRepository.findMany(position);

  return { message: '성공', dataList: student };
};