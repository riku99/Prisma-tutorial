import { PrismaClient } from "@prisma/client";

// npmでprisma clientをインストールした時にその時点で存在するschemaに合わせてclientも定義されている。
// shemaに変更があった場合はそのたびにgenerateする
const prisma = new PrismaClient();

const main = async () => {
  // prismaクエリ
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
