'use client'

import { useState, useEffect } from 'react';
import { Button, Grid, Container } from '@mui/material';
import CreateJobForm from '@/app/components/createjob/CreateJobForm';
import JobCard from '@/app/components/createjob/JobCard';
import { useUser } from '@/context/UserContext'

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
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setIsFormOpen(true)}
        sx={{ mb: 4 }}
      >
        Create Job
      </Button>
      
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

      <Grid container spacing={3}>
        {Array.isArray(jobs) && jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
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
  );}
