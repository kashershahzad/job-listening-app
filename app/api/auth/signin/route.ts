import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return NextResponse.json({ Message: "Email not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ Message: "Password is wrong" });
        }

        return NextResponse.json({ Message: "Login successful" });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ Message: "Something went wrong", Error: error });
    }
}
