import { MouComapnay } from '@prisma/client';
import { prisma } from '../global/prisma';

export type CreateMouCompany = Omit<MouComapnay, 'id'>;

export const create = async (mouCompany: CreateMouCompany) => {
  const result = await prisma.mouComapnay.create({
    data: {
      companyName: mouCompany.companyName,
      detailUrl: mouCompany.detailUrl,
      profileUrl: mouCompany.profileUrl,
      category: mouCompany.category,
      major: mouCompany.major,
    },
  });

  return result;
};

export const findMany = async () => {
  const result = await prisma.mouComapnay.findMany({
    select: {
      companyName: true,
      detailUrl: true,
      profileUrl: true,
      category: true,
      major: true,
    },
  });

  return result;
};
