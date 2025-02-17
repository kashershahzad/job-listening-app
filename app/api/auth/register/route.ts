import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    let name = '';
    let email = '';
    let password = '';

    try {
        const body = await req.json();
        name = body.name;
        email = body.email;
        password = body.password;
    } catch (error) {
        return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
    }

    if (!name) {
        return NextResponse.json({ message: "Name is required" }, { status: 400 });
    }
    if (!email) {
        return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }
    if (!password) {
        return NextResponse.json({ message: "Password is required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        return NextResponse.json({ message: "User already exists" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    });

    return NextResponse.json({ user, message: "User created successfully" });
}
