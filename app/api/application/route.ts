import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    // Parse the multipart form data
    const formData = await request.formData();
    
    // Get all the form fields
    const job_id = formData.get('job_id') as string;
    const user_id = formData.get('user_id') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const qualification = formData.get('qualification') as string;
    const resumeFile = formData.get('resume') as File;

    if (!job_id || !user_id || !name || !email || !phoneNumber || !qualification || !resumeFile) {
      return NextResponse.json(
        { error: "All fields including resume are required" },
        { status: 400 }
      );
    }

    // Convert File to Buffer for Cloudinary
    const bytes = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const cloudinaryResponse: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
            folder: "job-portal/resumes",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(buffer);
    });

    if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
      throw new Error("Cloudinary upload failed");
    }

    // Create application in database
    const application = await prisma.application.create({
      data: {
        jobId: parseInt(job_id, 10),
        userId: parseInt(user_id, 10),
        name,
        email,
        phoneNumber,
        qualification,
        resume: cloudinaryResponse.secure_url,
        status: "pending",
      },
    });

    return NextResponse.json({ success: true, application }, { status: 201 });
  } catch (error: unknown) {
    console.error("Application error:", error);
    const errorMessage = error instanceof Error ? error.message : "Application submission failed";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function GET() {
  try {
    const applications = await prisma.application.findMany({
      include: {
        job: true,
        user: true,
      },
    });
    return NextResponse.json({ success: true, applications });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch applications";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}