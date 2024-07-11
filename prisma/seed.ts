// import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const seedUser = async () => {
  try {
    const user = await prisma.user.create({
      data: {
        name: "User",
        email: "user@gmail.com",
        password: "password",
        isAdmin: false,
      },
    });

    console.log("user created with name", user.name);
  } catch (error) {
    console.log(error);
  }
};

const adminUser = async () => {
  try {
    const user = await prisma.user.create({
      data: {
        name: "admin",
        email: "admin@gmail.com",
        password: "password",
        isAdmin: true,
      },
    });

    console.log("admin user created with name", user.name);
  } catch (error) {
    console.log(error);
  }
};
async function main() {
  await seedUser();
  await adminUser();
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
