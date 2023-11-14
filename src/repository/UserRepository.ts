import { User } from '@prisma/client';
import { prisma } from '../global/prisma';

type UpsertUser = Omit<User, 'githubId' | 'company'>;

export const upsert = async (user: UpsertUser) => {
  const result = await prisma.user.upsert({
    where: {
      id: user.id,
    },
    update: {
      name: user.name,
      profileUrl: user.profileUrl,
      role: user.role,
      isGraduate: user.isGraduate,
    },
    create: {
      id: user.id,
      name: user.name,
      email: user.email,
      profileUrl: user.profileUrl,
      role: user.role,
      cardinal: user.cardinal,
      isGraduate: user.isGraduate,
    },
  });

  return result;
};

export const findOne = async (userCode: number) => {
  const result = await prisma.user.findUnique({
    where: {
      id: userCode,
    },
    select: {
      email: true,
      githubId: true,
      profileUrl: true,
      name: true,
      cardinal: true,
      role: true,
      isGraduate: true,
    },
  });

  return result;
};
