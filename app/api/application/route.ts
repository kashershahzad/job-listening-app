// app/api/application/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Remove the config export as it's not needed in App Router
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// Make sure to explicitly export the HTTP methods you want to support
export async function POST(request: NextRequest) {
  if (request.method !== 'POST') {
    return NextResponse.json(
      { error: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const formData = await request.formData();
    
    const job_id = formData.get('job_id') as string;
    const user_id = formData.get('user_id') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const qualification = formData.get('qualification') as string;
    const resumeFile = formData.get('resume') as File;

    // Log the received data for debugging
    console.log('Received form data:', {
      job_id,
      user_id,
      name,
      email,
      phoneNumber,
      qualification,
      resumeFile: resumeFile ? 'File present' : 'No file'
    });

    if (!job_id || !user_id || !name || !email || !phoneNumber || !qualification || !resumeFile) {
      return NextResponse.json(
        { error: "All fields including resume are required" },
        { status: 400 }
      );
    }

    // Convert File to Buffer for Cloudinary
    const bytes = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary with error handling
    const cloudinaryResponse: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "job-portal/resumes",
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(buffer);
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

    return NextResponse.json(
      { success: true, application }, 
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Application error:", error);
    const errorMessage = error instanceof Error ? error.message : "Application submission failed";
    return NextResponse.json(
      { error: errorMessage }, 
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  if (request.method !== 'GET') {
    return NextResponse.json(
      { error: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const applications = await prisma.application.findMany({
      include: {
        job: true,
        user: true,
      },
    });
    return NextResponse.json({ success: true, applications });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch applications";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}