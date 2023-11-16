import { prisma } from '../global/prisma';
import { StudenProfile } from '@prisma/client';

export const create = async (studentProfile: StudenProfile) => {
  const result = await prisma.studenProfile.create({
    data: {
      userCode: studentProfile.userCode,
      name: studentProfile.name,
      email: studentProfile.email,
      bio: studentProfile.bio,
      profileUrl: studentProfile.profileUrl,
      cardinal: studentProfile.cardinal,
      githubId: studentProfile.githubId,
      company: studentProfile.company,
      position: studentProfile.position,
      isGraduate: studentProfile.isGraduate,
    },
  });

  return result;
};

export const findUnique = async (userCode: number) => {
  const result = await prisma.studenProfile.findUnique({
    where: {
      userCode: userCode,
    },
    select: {
      name: true,
      bio: true,
      profileUrl: true,
      email: true,
      githubId: true,
      company: true,
      position: true,
      cardinal: true,
    },
  });

  return result;
};

export const findMany = async (position: string) => {
  const result = await prisma.studenProfile.findMany({
    where: {
      ...(position !== 'all' && { position: position }),
    },
    select: {
      userCode: true,
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
