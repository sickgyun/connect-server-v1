import { User } from '@prisma/client';
import { prismaClient } from '../global/prismaClient';

export const upsertUser = async (user: User) => {
  const result = await prismaClient.user.upsert({
    where: {
      id: user.id,
    },
    update: {
      name: user.name,
      profile_url: user.profile_url,
      role: user.role,
    },
    create: {
      id: user.id,
      name: user.name,
      profile_url: user.profile_url,
      role: user.role,
      github_id: user.github_id,
      cardinal: user.cardinal,
    },
  });

  return result;
};
