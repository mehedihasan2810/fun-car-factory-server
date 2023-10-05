import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// log the time that our queries are taking start
// prisma.$use(async (params, next) => {
//   const before = Date.now();

//   const result = await next(params);

//   const after = Date.now();

//   console.log(
//     `Query ${params.model}.${params.action} took ${after - before}ms`
//   );

//   return result;
// });
// log the time that our queries are taking end
