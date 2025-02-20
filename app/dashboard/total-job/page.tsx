'use client';

import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  Box,
  Avatar,
  Chip,
  CircularProgress
} from '@mui/material';
import {
  Work as WorkIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface User {
  id: string;
}

interface Job {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  salary: number;
}

// Mock useUser hook - replace with your actual implementation
const useUser = () => {
  return {
    user: { id: '1' } as User
  };
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '75%', md: '50%' },
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const { user } = useUser();

  useEffect(() => {
    fetch('/api/jobs')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch jobs');
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setResumeFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!resumeFile || !selectedJob || !user?.id) {
      alert('Please select a resume file and ensure you are logged in.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('job_id', selectedJob.id.toString());
    formData.append('user_id', user.id.toString());

    try {
      const response = await fetch('/api/application', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to submit application');

      await response.json();
      alert('Application submitted successfully!');
      setIsApplyOpen(false);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="64px">
        <Typography color="error" variant="h6">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', py: 6, bgcolor: 'grey.50' }}>
      <Container>
        <Grid container spacing={3}>
          {jobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 4,
                    bgcolor: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(10px)',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: 8,
                    },
                  }}
                >
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        width: 64,
                        height: 64,
                        mb: 2
                      }}
                    >
                      <WorkIcon sx={{ fontSize: 32 }} />
                    </Avatar>

                    <Typography variant="h5" component="h3" gutterBottom align="center" fontWeight="bold">
                      {job.title}
                    </Typography>

                    <Chip
                      label={job.category}
                      sx={{
                        mb: 2,
                        background: 'linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)',
                        color: 'white',
                      }}
                    />

                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
                      {job.description}
                    </Typography>

                    <Box sx={{ mt: 'auto', display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                      <Chip
                        icon={<LocationIcon />}
                        label={job.location}
                        sx={{ bgcolor: 'blue.50', color: 'blue.700' }}
                      />
                      <Chip
                        icon={<MoneyIcon />}
                        label={`$${job.salary.toLocaleString()}`}
                        sx={{ bgcolor: 'green.50', color: 'green.700' }}
                      />
                    </Box>

                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        mt: 3,
                        background: 'linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)',
                        borderRadius: 2,
                        boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
                      }}
                      onClick={() => {
                        setSelectedJob(job);
                        setIsDetailsOpen(true);
                      }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Job Details Modal */}
        <Modal
          open={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
        >
          <Box sx={modalStyle}>
            <Typography variant="h4" component="h2" gutterBottom>
              {selectedJob?.title}
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>
                <strong>Description:</strong> {selectedJob?.description}
              </Typography>
              <Typography gutterBottom>
                <strong>Category:</strong> {selectedJob?.category}
              </Typography>
              <Typography gutterBottom>
                <strong>Location:</strong> {selectedJob?.location}
              </Typography>
              <Typography gutterBottom>
                <strong>Salary:</strong> ${selectedJob?.salary.toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="success"
                onClick={() => setIsApplyOpen(true)}
              >
                Apply
              </Button>
              <Button
                variant="contained"
                onClick={() => setIsDetailsOpen(false)}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* Apply Modal */}
        <Modal
          open={isApplyOpen}
          onClose={() => setIsApplyOpen(false)}
        >
          <Box sx={modalStyle}>
            <Typography variant="h4" component="h2" gutterBottom>
              Apply for {selectedJob?.title}
            </Typography>
            <Typography gutterBottom>
              Please upload your resume to apply for this job.
            </Typography>
            <Box
              component="input"
              type="file"
              onChange={handleFileChange}
              accept=".pdf"
              sx={{
                width: '100%',
                mb: 3,
                p: 1,
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 1,
              }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                onClick={() => setIsApplyOpen(false)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </Container>
    </Box>
  );
}