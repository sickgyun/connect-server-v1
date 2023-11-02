import { prismaClient } from './src/utils/prismaClient';

async function main() {
  const user = await prismaClient.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
    },
  });
  console.log(user);
}

main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });
