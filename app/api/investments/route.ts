import prisma from "@/prisma/prisma";
import { investmentTypeEnum } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, res: NextResponse) {
  try {
    const investmentCount = await prisma.investment.count();

    const investmentData = await prisma.investment.findMany({
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

    return NextResponse.json(
      { data: investmentData, count: investmentCount },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { amount, transactionType, clientId } = await req.json();

  try {
    const investmentData = await prisma.investment.create({
      data: {
        amount: Number(amount),
        transactionType: transactionType as unknown as investmentTypeEnum,
        status: "pending",
        client: {
          connect: {
            id: clientId,
          },
        },
      },
    });
    return NextResponse.json({ data: investmentData }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
