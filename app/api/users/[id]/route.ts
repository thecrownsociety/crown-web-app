import prisma from "@/prisma/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const userExists = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!userExists) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  try {
    let userDetails = await prisma.user.findUnique({
      where: {
        id: id,
      },

      select: {
        id: true,
        brokerName: true,
        email: true,
        investmentGoal: true,
        name: true,
        phoneNumber: true,
        riskTakingCapacity: true,
        investments: true,
      },
    });

    return new Response(JSON.stringify(userDetails), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error while getting user details" }),
      { status: 500 }
    );
  }
}
