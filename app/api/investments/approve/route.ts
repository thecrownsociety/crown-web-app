import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, res: NextResponse) {
  const { approvalNote, investmentId } = await req.json();

  try {
    const updatedInvestment = await prisma.investment.update({
      where: {
        id: investmentId,
      },
      data: {
        status: "approved",
        approvalNote,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(
      { message: "Transaction approved" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
