import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

interface JobPostRequest {
    title: string;
    description: string;
    category: string;
    location: string;
    salary: string;
}

export async function POST(req: NextRequest) {
    let body: JobPostRequest;

    try {
        body = await req.json();
    } catch (error) {
        return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
    }

    const { title, description, category, location, salary } = body;

    if (!title || !description || !category || !location || !salary) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    try {
        const job = await Prisma.job.create({
            data: {
                title,
                description,
                category,
                location,
                salary: parseFloat(salary),
            },
        });

        return NextResponse.json({ job }, { status: 201 });
    } catch (error) {
        console.error("Error creating job:", error);
        return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const jobs = await Prisma.job.findMany();

        return NextResponse.json({ jobs }, { status: 200 });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();
        await Prisma.job.delete({
            where: { id },
        });
        return new Response(JSON.stringify({ message: "Customer Deleted successfully" }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Something went wrong", }),
            { status: 500 }
        );
    }
}

