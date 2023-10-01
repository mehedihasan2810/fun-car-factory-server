import { prisma } from "./prisma/index";



async function main() {
  // ... you will write your Prisma Client queries here
  const cars = await prisma.cars.findMany();

  console.log(cars.length);
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
