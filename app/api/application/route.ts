import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { Readable } from "stream";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("application/")) {
      cb(null, true);
    } else {
      cb(new Error("Only document files are allowed"));
    }
  },
});

async function runMiddleware(req: any, res: any, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        console.error("Middleware error:", result);
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export const config = {
  runtime: "nodejs",
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  try {
    
    const arrayBuffer = await req.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const stream = Readable.from(buffer);

    const reqAny: any = stream;
    reqAny.headers = Object.fromEntries(req.headers);
    reqAny.method = req.method;
    reqAny.body = {};

    await runMiddleware(reqAny, {}, upload.single("resume"));

    console.log("Request Body:", reqAny.body);
    console.log("Request File:", reqAny.file);

    const { job_id, user_id, name, email, phoneNumber, qualification } = reqAny.body;
    const resumeFile = reqAny.file;

    if (!job_id || !user_id || !name || !email || !phoneNumber || !qualification || !resumeFile || !resumeFile.buffer) {
      return NextResponse.json(
        { error: "Job ID, User ID, Name, Email, Phone Number, Qualification, and Resume are required" },
        { status: 400 }
      );
    }

    const jobId = parseInt(job_id, 10);
    const userId = parseInt(user_id, 10);

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
        .end(resumeFile.buffer);
    });

    if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
      throw new Error("Cloudinary upload failed");
    }

    const application = await prisma.application.create({
      data: {
        jobId,
        userId,
        name,
        email,
        phoneNumber,
        qualification,
        resume: cloudinaryResponse.secure_url,
        status: "pending",
      },
    });

    console.log(application);

    return NextResponse.json({ success: true, application }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Application submission failed";
    console.error("Application error:", errorMessage);

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function GET(req: Request) {
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