import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextResponse) {
  const currentUrl = new URL(req.url).searchParams;
  const skip = Number(currentUrl.get("skip"));
  const take = Number(currentUrl.get("take"));

  try {
    const callsCount = await prisma.consultingCalls.count();

    const consultingCalls = await prisma.consultingCalls.findMany({
      skip,
      take,
      select: {
        id: true,
        client: {
          select: {
            id: true,
            name: true,
            isAdmin: true,
          },
        },
        interviewer: {
          select: {
            id: true,
            name: true,
            isAdmin: true,
          },
        },
        docLink: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { data: consultingCalls, count: callsCount },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: Request, res: NextResponse) {
  const { clientId, interviewerId, docLink } = await req.json();

  try {
    const newConsultingCallData = await prisma.consultingCalls.create({
      data: {
        clientId,
        interviwerId: interviewerId,
        docLink,
      },
    });

    return NextResponse.json({ newConsultingCallData }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
