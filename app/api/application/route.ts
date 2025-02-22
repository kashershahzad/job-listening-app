import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract form data
    const jobId = formData.get('job_id');
    const userId = formData.get('user_id');
    const name = formData.get('name');
    const email = formData.get('email');
    const phoneNumber = formData.get('phoneNumber');
    const qualification = formData.get('qualification');
    const resumeFile = formData.get('resume') as File;

    if (!resumeFile || !jobId || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Convert file to array buffer and then to base64
    const bytes = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64String = buffer.toString('base64');

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(
      `data:${resumeFile.type};base64,${base64String}`,
      {
        resource_type: 'raw',
        folder: 'resumes',
      }
    );

    // Create application in database
    const application = await prisma.application.create({
      data: {
        jobId: parseInt(jobId.toString()),
        userId: parseInt(userId.toString()),
        name: name?.toString(),
        email: email?.toString(),
        phoneNumber: phoneNumber?.toString(),
        qualification: qualification?.toString(),
        resume: uploadResponse.secure_url,
        status: 'pending'
      },
      include: {
        job: true,
        user: true,
      },
    });

    return NextResponse.json({
      message: 'Application submitted successfully',
      data: application
    }, { status: 201 });

  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json({
      error: 'Failed to submit application',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}







































































// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';
// import { v2 as cloudinary } from 'cloudinary';

// // Initialize Prisma Client
// const prisma = new PrismaClient();

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: '10mb', // Adjust the size limit as needed
//     },
//   },
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === 'POST') {
//     try {
//       const { job_id, user_id, name, email, phoneNumber, qualification } = req.body;
      
//       // Convert the resume file to base64
//       const base64File = Buffer.from(req.body.resume).toString('base64');
      
//       // Upload resume to Cloudinary
//       const uploadResponse = await cloudinary.uploader.upload(
//         `data:application/pdf;base64,${base64File}`,
//         {
//           resource_type: 'raw',
//           folder: 'resumes',
//         }
//       );

//       // Create application in database
//       const application = await prisma.application.create({
//         data: {
//           jobId: parseInt(job_id),
//           userId: parseInt(user_id),
//           name: name,
//           email: email,
//           phoneNumber: phoneNumber,
//           qualification: qualification,
//           resume: uploadResponse.secure_url,
//           status: 'pending'
//         },
//         include: {
//           job: true,
//           user: true,
//         },
//       });

//       res.status(201).json({ 
//         message: 'Application submitted successfully',
//         data: application 
//       });

//     } catch (error) {
//       console.error('Error submitting application:', error);
//       res.status(500).json({ 
//         error: 'Failed to submit application',
//         details: error instanceof Error ? error.message : 'Unknown error'
//       });
//     }
//   } 
//   else if (req.method === 'GET') {
//     try {
//       const { userId, jobId } = req.query;

//       // Build the where clause based on provided filters
//       const whereClause: any = {};
//       if (userId) whereClause.userId = parseInt(userId as string);
//       if (jobId) whereClause.jobId = parseInt(jobId as string);

//       const applications = await prisma.application.findMany({
//         where: whereClause,
//         include: {
//           job: true,
//           user: true,
//         },
//         orderBy: {
//           id: 'desc',
//         },
//       });

//       res.status(200).json({ 
//         message: 'Applications retrieved successfully',
//         data: applications 
//       });

//     } catch (error) {
//       console.error('Error fetching applications:', error);
//       res.status(500).json({ 
//         error: 'Failed to fetch applications',
//         details: error instanceof Error ? error.message : 'Unknown error'
//       });
//     }
//   } 
//   else {
//     res.setHeader('Allow', ['POST', 'GET']);
//     res.status(405).json({ error: `Method ${req.method} Not Allowed` });
//   }
// }

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