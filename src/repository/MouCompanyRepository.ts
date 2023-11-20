import { MouComapnay } from '@prisma/client';
import { prisma } from '../global/prisma';

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
