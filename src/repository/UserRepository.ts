import { User } from '@prisma/client';
import { prisma } from '../global/prisma';

export const upsertUser = async (user: User) => {
  const result = await prisma.user.upsert({
    where: {
      id: user.id,
    },
    update: {
      name: user.name,
      profile_url: user.profile_url,
      company: user.company,
      role: user.role,
      isGraduate: user.isGraduate,
    },
    create: {
      id: user.id,
      name: user.name,
      email: user.email,
      profile_url: user.profile_url,
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
      github_id: true,
      profile_url: true,
      name: true,
      cardinal: true,
      role: true,
      isGraduate: true,
    },
  });

  return result;
};
