'use client'

import { useState, useEffect } from 'react';
import { Button, Grid, Container, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; // Import the Add icon
import CreateJobForm from '@/app/components/createjob/CreateJobForm';
import JobCard from '@/app/components/createjob/JobCard';
import { useUser } from '@/context/UserContext';

export default function JobPostForm() {
  const [jobs, setJobs] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const fetchJobs = async () => {
    const response = await fetch('/api/jobs');
    const data = await response.json();
    console.log('API Response:', data);
    setJobs(data.jobs || []);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleCreateJob = async (formData) => {
    if (!user) {
      console.error("User not found!");
      return;
    }
    const response = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, userId: user.id })
    });
    if (response.ok) {
      fetchJobs();
      setIsFormOpen(false);
    }
  };

  const handleUpdateJob = async (formData) => {
    const response = await fetch('/api/jobs', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      fetchJobs();
      setIsFormOpen(false);
      setSelectedJob(null);
    }
  };

  const handleDeleteJob = async (id) => {
    const response = await fetch('/api/jobs', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      fetchJobs();
    }
  };

  return (
    <Container maxWidth="xl" sx={{ p: 4 }}>
      <Box display="flex" justifyContent="center" sx={{ mb: 4 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setIsFormOpen(true)}
          startIcon={<AddIcon />} // Add the icon here
          sx={{
            py: 2, // Increase padding for a larger button
            px: 4, // Increase padding for a larger button
            fontSize: '1.1rem', // Increase font size
            borderRadius: '8px', // Add rounded corners
            boxShadow: 3, // Add a subtle shadow
            '&:hover': {
              boxShadow: 6, // Increase shadow on hover
              transform: 'translateY(-2px)', // Slight lift on hover
            },
            transition: 'all 0.3s ease', // Smooth transition for hover effects
          }}
        >
          Create Job
        </Button>
      </Box>
      
      {isFormOpen && (
        <CreateJobForm
          onSubmit={selectedJob ? handleUpdateJob : handleCreateJob}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedJob(null);
          }}
          initialData={selectedJob}
        />
      )}

      <Grid spacing={3}>
        {Array.isArray(jobs) && jobs.map((job) => (
          <Grid item key={job.id} sx={{ mb: 10 }}>
            <JobCard
              job={job}
              onDelete={handleDeleteJob}
              onUpdate={(job) => {
                setSelectedJob(job);
                setIsFormOpen(true);
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}