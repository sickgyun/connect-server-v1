import { prisma } from '../global/prisma';
import { Senior } from '@prisma/client';

export const create = async (senior: Senior) => {
  const result = await prisma.senior.create({
    data: {
      id: senior.id,
      name: senior.name,
      email: senior.email,
      bio: senior.bio,
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

export const findUnique = async (userCode: number) => {
  const result = await prisma.senior.findUnique({
    where: {
      id: userCode,
    },
    select: {
      name: true,
      bio: true,
      email: true,
      githubId: true,
      company: true,
      position: true,
    },
  });

  return result;
};

export const findMany = async (position: string) => {
  const result = await prisma.senior.findMany({
    where: {
      ...(position !== 'all' && { position: position }),
    },
    select: {
      id: true,
      name: true,
      bio: true,
      profileUrl: true,
      cardinal: true,
      company: true,
      position: true,
    },
  });

  return result;
};
