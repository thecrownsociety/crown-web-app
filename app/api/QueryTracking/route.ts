import { prisma } from "../../../prisma/prisma";

export async function GET(req: Request) {
  try {
    const queries = await prisma.queryTracking.findMany({
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return Response.json(queries, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
