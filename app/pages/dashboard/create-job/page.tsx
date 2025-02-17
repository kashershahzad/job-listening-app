'use client'

import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { useUser } from '@/context/UserContext';

// Define the Zod schema
const jobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Location is required"),
  salary: z.string().min(1, "Salary is required").regex(/^\d+(\.\d{1,2})?$/, "Salary must be a number"),
});

// Infer the type from the schema
type JobFormValues = z.infer<typeof jobSchema>;

const JobPostForm: React.FC = () => {
  const { user } = useUser();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      location: '',
      salary: '',
    },
  });

  const onSubmit: SubmitHandler<JobFormValues> = async (data) => {
    try {
      // Ensure that the user is logged in and is an admin

      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }

      const result = await response.json();
      console.log('Job created:', result.job);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Container maxWidth="sm" className="py-8">
      <Box className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <Typography variant="h4" className="mb-6 text-center">
          Post a Job
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                fullWidth
                error={!!errors.title}
                helperText={errors.title?.message}
                className="mb-4"
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                fullWidth
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description?.message}
                className="mb-4"
              />
            )}
          />
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Category"
                fullWidth
                error={!!errors.category}
                helperText={errors.category?.message}
                className="mb-4"
              />
            )}
          />
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Location"
                fullWidth
                error={!!errors.location}
                helperText={errors.location?.message}
                className="mb-4"
              />
            )}
          />
          <Controller
            name="salary"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Salary"
                fullWidth
                error={!!errors.salary}
                helperText={errors.salary?.message}
                className="mb-4"
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="mt-6"
          >
            Post Job
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default JobPostForm;