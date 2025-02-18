import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { getIronSession } from "iron-session";
import { sessionOptions, UserSession } from "@/lib/session";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ Message: "Email not found" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ Message: "Password is wrong" }, { status: 401 });
    }

    // Get the session object
    const res = NextResponse.json({ Message: "Login successful" });
    const session = await getIronSession<UserSession>(req, res, sessionOptions);

    // Store user session
    session.id = user.id.toString();
    session.email = user.email;
    session.name = user.name;
    session.role = user.role;

    await session.save();

    return res;
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ Message: "Something went wrong", Error: error }, { status: 500 });
  }
}
