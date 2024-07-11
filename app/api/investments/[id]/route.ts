import prisma from "@/prisma/prisma";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const userInvestments = await prisma.investment.findMany({
      where: {
        clientId: id || "",
      },
      orderBy: {
        transactionDate: "desc",
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // console.log(userInvestments);
    return NextResponse.json(userInvestments, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error getting investment details" },
      { status: 500 }
    );
  }
}
