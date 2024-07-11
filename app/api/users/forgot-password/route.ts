import prisma from "@/prisma/prisma";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { email, password, confirmPassword } = await req.json();

  try {
    if (confirmPassword !== password) {
      return new NextResponse(
        JSON.stringify({ error: "password not matching" }),
        { status: 401 }
      );
    }

    const userData = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!userData) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const isPasswordSame = await bcrypt.compare(password, userData?.password!);

    if (isPasswordSame) {
      return new NextResponse(
        JSON.stringify({
          error: "Password cannot be same as previous password",
        }),
        { status: 403 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userData.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return new NextResponse(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error }), { status: 500 });
  }
}
