import { prisma } from "../../../../prisma/prisma";
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const queries = await prisma.queryTracking.findMany({
      where: {
        createdById: params.id,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return Response.json(queries, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
