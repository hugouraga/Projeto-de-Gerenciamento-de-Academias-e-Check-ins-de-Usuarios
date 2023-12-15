import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.typeUser.create({
    data: {
      type: 'client',
    },
  });
  await prisma.typeUser.create({
    data: {
      type: 'gym_admin',
    },
  });
  await prisma.typeUser.create({
    data: {
      type: 'master',
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
