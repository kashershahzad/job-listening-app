import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, UserSession } from "@/lib/session";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const res = new NextResponse();
    const session = await getIronSession<UserSession>(req, res, sessionOptions);

    if (!session.id || !session.email) {
      return NextResponse.json({ Message: "No session found" }, { status: 401 });
    }

    // Fetch applied jobs along with status
    const applications = await prisma.application.findMany({
      where: { userId: parseInt(session.id) },
      include: { job: true }, // Get job details
    });

    // Map applications to extract job details along with status
    const appliedJobs = applications.map(app => ({
      ...app.job, // Spread job details
      status: app.status, // Include status from Application model
    }));

    return NextResponse.json({
      id: session.id,
      email: session.email,
      name: session.name,
      role: session.role,
      appliedJobs, // Now includes status
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ Message: "Something went wrong", Error: error }, { status: 500 });
  }
}

