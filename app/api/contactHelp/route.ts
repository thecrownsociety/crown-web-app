import { resend } from "@/lib/utils/resend";
import { EmailTemplate } from "@/lib/utils/email-template";
import prisma from "@/prisma/prisma";

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();

  try {
    // find user details
    const userDetails = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    });

    // create a new query with this user as created by
    await prisma.queryTracking.create({
      data: {
        queryStatus: "Raised",
        subject: subject,
        createdBy: {
          connect: {
            id: userDetails?.id,
          },
        },
      },
    });

    // send an email
    const data = await resend.emails.send({
      from: `Acme <onboarding@resend.dev>`,
      to: ["vanjregautham@gmail.com"],
      subject,
      react: EmailTemplate({ name, email, message }),
      text: "",
    });

    return Response.json(data, { status: 201 });
  } catch (error) {
    return Response.json({ error });
  }
}
