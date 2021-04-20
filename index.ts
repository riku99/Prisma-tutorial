import { PrismaClient } from "@prisma/client";

// npmでprisma clientをインストールした時にその時点で存在するschemaに合わせてclientも定義されている。
// shemaに変更があった場合はそのたびにgenerateする
const prisma = new PrismaClient();

const main = async () => {
  // Userレコードの作成
  // ネストクエリを使いPostとProfileも作成している
  await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
      posts: {
        // Postも作成
        create: { title: "Hello World" },
      },
      profile: {
        // Profileも作成
        create: { bio: "I like Prisma" },
      },
    },
  });

  // アップデート処理
  const post = await prisma.post.update({
    where: { id: 1 },
    data: { published: true },
  });

  console.log(post);

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
  console.dir(allUsers, { depth: null });
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
