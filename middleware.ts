import { NextRequest, NextResponse } from 'next/server';
import { UserSession } from '@/lib/session';
import { sessionOptions } from '@/lib/session';
import { getIronSession, IronSession } from 'iron-session';

// Middleware to protect the /dashboard route
export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const res = NextResponse.next();
    // const session: IronSession<UserSession> = await getIronSession<UserSession>(
    //     req,
    //     res,
    //     sessionOptions
    // )

    // Protect the /dashboard route
    if (pathname.startsWith('/dashboard')) {
        // Get the User_data cookie (session) as a string
        const session = req.cookies.get('User_data')?.value;

        console.log(session)
        if (!session) {
            // No session found, redirect to login page
            const loginUrl = new URL('/signin', req.url);
            return NextResponse.redirect(loginUrl);
        }

    }

    // Continue with the request if the session is valid
    return NextResponse.next();
}

// Optional: Configure matcher to limit middleware scope to specific paths
export const config = {
    matcher: ['/dashboard/:path*'], // Apply middleware only to /dashboard and subroutes
};