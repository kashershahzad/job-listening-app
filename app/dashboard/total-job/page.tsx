'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Modal, Box, CircularProgress } from '@mui/material';

interface Job {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  salary: number;
}

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleOpen = (job: Job) => {
    setSelectedJob(job);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetch('/api/jobs')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        return response.json();
      })
      .then((data) => {
        setJobs(data.jobs);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress className="text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-lg text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Job Listings
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card
            key={job.id}
            className="hover:shadow-xl transition-shadow duration-300 rounded-lg border border-gray-200 transform hover:scale-105 transition-transform duration-300"
          >
            <CardContent className="p-6">
              <Typography
                variant="h5"
                component="div"
                className="font-bold text-xl text-gray-800 mb-2"
              >
                {job.title}
              </Typography>
              <Typography
                variant="body2"
                className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full inline-block mb-4"
              >
                {job.category}
              </Typography>
              <Typography className="text-gray-700 mb-2">
                <span className="font-semibold">Location:</span> {job.location}
              </Typography>
              <Typography className="text-gray-700 mb-4">
                <span className="font-semibold">Salary:</span> $
                {job.salary.toLocaleString()}
              </Typography>
              <Button
                onClick={() => handleOpen(job)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal for Job Details */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 md:w-3/4 lg:w-1/2 bg-white rounded-lg shadow-2xl p-6 outline-none"
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="text-2xl font-bold text-gray-800 mb-4"
          >
            {selectedJob?.title}
          </Typography>
          <Typography
            id="modal-modal-description"
            className="text-gray-700 mb-4"
          >
            <span className="font-semibold">Description:</span>{' '}
            {selectedJob?.description}
          </Typography>
          <Typography className="text-gray-700 mb-2">
            <span className="font-semibold">Category:</span>{' '}
            {selectedJob?.category}
          </Typography>
          <Typography className="text-gray-700 mb-2">
            <span className="font-semibold">Location:</span>{' '}
            {selectedJob?.location}
          </Typography>
          <Typography className="text-gray-700 mb-4">
            <span className="font-semibold">Salary:</span> $
            {selectedJob?.salary.toLocaleString()}
          </Typography>
          <Button
            onClick={handleClose}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}