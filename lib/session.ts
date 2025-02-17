import { SessionOptions } from "iron-session";


export interface UserSession {
    id: string;
    email: string;
    name?: string;
    role?: string;
}

export const sessionOptions: SessionOptions = {
    password: process.env.SESSION_SECRET ?? "",
    cookieName: "User_data",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
};

