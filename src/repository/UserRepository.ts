import { prisma } from '../global/prisma';

export const findOneUser = async (userCode: number) => {
  const result = await prisma.user.findUnique({
    where: {
      id: userCode,
    },
    select: {
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
