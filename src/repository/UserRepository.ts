import { User } from '@prisma/client';
import { prisma } from '../global/prisma';

export type UpsertUser = Omit<User, 'githubId' | 'company'>;

export const upsert = async (user: UpsertUser) => {
  const result = await prisma.user.upsert({
    where: {
      userCode: user.userCode,
    },
    update: {
      name: user.name,
      profileUrl: user.profileUrl,
      role: user.role,
      isGraduate: user.isGraduate,
    },
    create: {
      userCode: user.userCode,
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

export type UpdateUser = {
  userCode: number;
  email: string;
  githubId: string;
};

export const update = async (user: UpdateUser) => {
  const result = await prisma.user.update({
    where: {
      userCode: user.userCode,
    },
    data: {
      email: user.email,
      githubId: user.githubId,
    },
  });

  return result;
};

export const findOne = async (userCode: number) => {
  const result = await prisma.user.findUnique({
    where: {
      userCode: userCode,
    },
    select: {
      userCode: true,
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
