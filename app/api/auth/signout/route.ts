import { NextRequest, NextResponse } from "next/server";
import { UserSession } from "@/lib/session";
import { sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";

export async function POST(req: NextRequest) {

    const response = new NextResponse()

    const session = await getIronSession<{ user?: UserSession }>(
        req,
        response,
        sessionOptions
    );

    console.log(session)

    // if (!session.user) {
    //     return NextResponse.json(
    //         { message: "No active session to logout" },
    //         { status: 401 }
    //     );
    // }
 
    session.destroy();

    await session.save();

    const logoutResponse = new NextResponse(
      JSON.stringify({ message: "Logged out successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `${sessionOptions.cookieName}=; Path=/; HttpOnly; Max-Age=0;`,
        },
      }
    );
  
    return logoutResponse;
}
