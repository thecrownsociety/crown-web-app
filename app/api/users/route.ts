import bcrypt from "bcrypt";
import prisma from "@/prisma/prisma";
import { riskTakingCapacityTypes } from "@prisma/client";

export async function GET(req: Request) {
  try {
    await prisma.$connect();
    const users = await prisma.user.findMany();
    return new Response(JSON.stringify(users), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: `${error}` }), {
      status: 401,
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: Request) {
  const { name, email, password, isAdmin } = await req.json();
  try {
    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({
          message: "body cannot be empty",
        }),
        {
          status: 422,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const emailExists = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (emailExists) {
      return new Response(
        JSON.stringify({
          message: "email already exists",
        }),
        {
          status: 405,
        }
      );
    }

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        isAdmin: isAdmin,
      },
    });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: `Something went wrong ${error}`,
      }),
      {
        status: 401,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req: Request) {
  let { investmentGoal, phoneNumber, userId, brokerName, riskTakingCapacity } =
    await req.json();

  riskTakingCapacity = riskTakingCapacity as unknown as riskTakingCapacityTypes;

  if (investmentGoal && typeof investmentGoal !== "number") {
    return new Response(
      JSON.stringify({
        message: "Phone number and investment goal must be a number",
      }),
      {
        status: 401,
      }
    );
  }

  console.log("phone number value after validation: ", phoneNumber);

  const userExists = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
    },
  });

  if (!userExists) {
    return new Response(JSON.stringify({ message: "User does not exist" }), {
      status: 404,
    });
  }

  console.log("phone number just before DB transaction: ", phoneNumber);
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },

      data: {
        brokerName: brokerName,
        investmentGoal: investmentGoal,
        phoneNumber: phoneNumber,
        riskTakingCapacity: riskTakingCapacity,
      },
    });

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "catch block" }), {
      status: 500,
    });
  }
}
