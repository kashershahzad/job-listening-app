import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, UserSession } from "@/lib/session";

export async function GET(req: NextRequest) {
  try {
    // Create a response object
    const res = new NextResponse();

    // Get the session
    const session = await getIronSession<UserSession>(req, res, sessionOptions);

    // Check if the session exists and has user data
    if (!session.id || !session.email) {
      return NextResponse.json({ Message: "No session found" }, { status: 401 });
    }

    // Return the session data
    return NextResponse.json({
      id: session.id,
      email: session.email,
      name: session.name,
      role:session.role,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ Message: "Something went wrong", Error: error }, { status: 500 });
  }
}