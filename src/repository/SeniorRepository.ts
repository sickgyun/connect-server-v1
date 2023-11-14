import { prisma } from '../global/prisma';
import { Senior } from '@prisma/client';

export const create = async (senior: Senior) => {
  const result = await prisma.senior.create({
    data: {
      id: senior.id,
      name: senior.name,
      email: senior.email,
      profileUrl: senior.profileUrl,
      cardinal: senior.cardinal,
      githubId: senior.githubId,
      company: senior.company,
      position: senior.position,
      isGraduate: senior.isGraduate,
    },
  });

  return result;
};

export const findMany = async () => {
  const result = await prisma.senior.findMany({
    select: {
      id: true,
      name: true,
      profileUrl: true,
      cardinal: true,
      company: true,
      position: true,
    },
  });

  return result;
};
