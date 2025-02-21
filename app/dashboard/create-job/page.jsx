'use client';

import { useState } from 'react';
import { Button, Grid, Container, Box, Dialog, DialogTitle, DialogContent, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CreateJobForm from '@/app/components/createjob/CreateJobForm';
import JobCard from '@/app/components/createjob/JobCard';
import { useUser } from '@/context/UserContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function JobPostForm() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Fetch jobs using TanStack Query
  const { data: jobs, isLoading, isError } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const response = await fetch('/api/jobs');
      if (!response.ok) throw new Error('Failed to fetch jobs');
      const data = await response.json();
      return data.jobs || [];
    },
  });

  // Create job mutation
  const createJobMutation = useMutation({
    mutationFn: async (formData) => {
      if (!user) throw new Error('User not found!');
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userId: user.id }),
      });
      if (!response.ok) throw new Error('Failed to create job');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['jobs']); // Refetch jobs after creation
      setIsFormOpen(false);
      alert('Job created successfully!');
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  // Update job mutation
  const updateJobMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch('/api/jobs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to update job');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['jobs']); // Refetch jobs after update
      setIsFormOpen(false);
      setSelectedJob(null);
      alert('Job updated successfully!');
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  // Delete job mutation
  const deleteJobMutation = useMutation({
    mutationFn: async (id) => {
      const response = await fetch('/api/jobs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error('Failed to delete job');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['jobs']); // Refetch jobs after deletion
      alert('Job deleted successfully!');
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching jobs</div>;

  return (
    <Container maxWidth="xl" sx={{ p: 4 }}>
      <Box display="flex" justifyContent="center" sx={{ mb: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsFormOpen(true)}
          startIcon={<AddIcon />}
          sx={{
            py: 2,
            mb: 10,
            px: 4,
            fontSize: '1.1rem',
            borderRadius: '8px',
            boxShadow: 3,
            '&:hover': {
              boxShadow: 6,
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Create Job
        </Button>
      </Box>

      <Dialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '12px',
            boxShadow: 24,
            overflow: 'hidden',
          },
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            color: '#fff',
            padding: '16px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {selectedJob ? 'Update Job' : 'Create Job'}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => {
              setIsFormOpen(false);
              setSelectedJob(null);
            }}
            sx={{
              color: '#fff',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            padding: '24px',
            backgroundColor: (theme) => theme.palette.background.paper,
          }}
        >
          <CreateJobForm
            onSubmit={selectedJob ? updateJobMutation.mutate : createJobMutation.mutate}
            onClose={() => {
              setIsFormOpen(false);
              setSelectedJob(null);
            }}
            initialData={selectedJob}
          />
        </DialogContent>
      </Dialog>

      <Grid spacing={3}>
        {Array.isArray(jobs) &&
          jobs.map((job) => (
            <Grid item key={job.id} sx={{ mb: 10 }}>
              <JobCard
                job={job}
                onDelete={deleteJobMutation.mutate}
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