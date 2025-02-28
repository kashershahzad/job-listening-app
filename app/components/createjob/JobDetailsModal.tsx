import { useEffect, useState } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';

interface JobDetailsModalProps {
  open: boolean;
  onClose: () => void;
  job: {
    id: number;
    title: string;
    description: string;
    category: string;
    location: string;
    salary: number;
  };
  onDelete: (id: number) => void;
  onUpdate: (job: any) => void;
}

interface Application {
  id: number;
  jobId: number;
  userId: number;
  name: string;
  email: string;
  phoneNumber: string;
  qualification: string;
  resume: string;
  status: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export default function JobDetailsModal({ open, onClose, job, onDelete, onUpdate }: JobDetailsModalProps) {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    if (open) {
      fetchApplications();
    }
  }, [open]);

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/application', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.success) {
        setApplications(data.applications.filter((app: Application) => app.jobId === job.id));
      }
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    }
  };

  const handleAccept = async (applicationId: number) => {
    try {
      const response = await fetch(`/api/application/${applicationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'accepted' }),
      });
      if (response.ok) {
        fetchApplications();
      }
    } catch (error) {
      console.error('Failed to accept application:', error);
    }
  };

  const handleDecline = async (applicationId: number) => {
    try {
      const response = await fetch(`/api/application/${applicationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'declined' }),
      });
      if (response.ok) {
        fetchApplications();
      }
    } catch (error) {
      console.error('Failed to decline application:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="bg-white p-6 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96">
        <Typography variant="h6" className="font-bold mb-4">
          {job.title}
        </Typography>
        <Typography>{job.description}</Typography>
        <Typography>Category: {job.category}</Typography>
        <Typography>Location: {job.location}</Typography>
        <Typography>Salary: ${job.salary}</Typography>

        <Typography variant="h6" className="font-bold mt-4">
          Applicants
        </Typography>
        {applications.map((application) => (
          <Box key={application.id} className="mt-2 p-2 border rounded">
            <Typography>Name: {application.name}</Typography>
            <Typography>Email: {application.email}</Typography>
            <Typography>Phone: {application.phoneNumber}</Typography>
            <Typography>Qualification: {application.qualification}</Typography>
            <Typography>Resume: <a href={application.resume} target="_blank" rel="noopener noreferrer">View Resume</a></Typography>
            <Typography>Status: {application.status}</Typography>
            <div className="mt-2 space-x-2">
              <Button variant="contained" color="primary" onClick={() => handleAccept(application.id)}>
                Accept
              </Button>
              <Button variant="contained" color="secondary" onClick={() => handleDecline(application.id)}>
                Decline
              </Button>
            </div>
          </Box>
        ))}
        <div className="mt-4 space-x-2">
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
        </div>
      </Box>
    </Modal>
  );
}