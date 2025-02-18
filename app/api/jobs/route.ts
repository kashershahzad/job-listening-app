import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

interface JobPostRequest {
    id?: string; // Add id for update operation
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
        return new Response(JSON.stringify({ message: "Job Deleted successfully" }), {
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

export async function PUT(req: NextRequest) {
    let body: JobPostRequest;

    try {
        body = await req.json();
    } catch (error) {
        return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
    }

    const { id, title, description, category, location, salary } = body;

    if (!id || !title || !description || !category || !location || !salary) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    try {
        // Convert `id` from string to number
        const jobId = parseInt(id, 10);

        if (isNaN(jobId)) {
            return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
        }

        const updatedJob = await Prisma.job.update({
            where: { id: jobId }, // Use the numeric `id`
            data: {
                title,
                description,
                category,
                location,
                salary: parseFloat(salary),
            },
        });

        return NextResponse.json({ job: updatedJob }, { status: 200 });
    } catch (error) {
        console.error("Error updating job:", error);
        return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
    }
}