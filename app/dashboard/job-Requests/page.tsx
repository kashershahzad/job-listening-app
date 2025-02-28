'use client';

import React from 'react';
import { useUser } from '@/context/UserContext';
import { Container, Typography, Card, CardContent, Grid, Avatar, Chip, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { Work as WorkIcon, LocationOn as LocationIcon, AttachMoney as MoneyIcon } from '@mui/icons-material';

const AppliedJobsPage = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="h-screen flex justify-center items-center bg-gray-50">
        <CircularProgress size={60} sx={{ color: '#6366F1' }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 ">
      <Container>
        <div className="text-center mb-12">
        </div>

        {user.appliedJobs.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <Typography variant="h6" className="text-gray-600">
              No jobs applied
            </Typography>
          </div>
        ) : (
          <Grid container spacing={6}>
            {user.appliedJobs.map((job) => (
              <Grid item xs={12} sm={6} md={4} key={job.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-full"
                >
                  <Card
                    className="h-full flex flex-col rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                    sx={{
                      borderRadius: '16px',
                      background: 'white',
                      border: '1px solid #E5E7EB',
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                    }}
                  >
                    <CardContent className="flex flex-col items-center text-center p-6 flex-grow">
                      <Avatar
                        sx={{
                          background: '#6366F1',
                          width: 56,
                          height: 56,
                          mb: 3,
                        }}
                      >
                        <WorkIcon sx={{ color: 'white' }} />
                      </Avatar>
                      <Typography variant="h6" className="font-semibold text-gray-900">
                        {job.title}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600 mt-2 px-4 flex-grow">
                        {job.description}
                      </Typography>
                      <div className="mt-auto flex flex-wrap gap-2 justify-center">
                        <Chip
                          icon={<LocationIcon />}
                          label={job.location}
                          sx={{ backgroundColor: '#E3F2FD', color: '#1976D2', fontWeight: 500 }}
                        />
                        <Chip
                          icon={<LocationIcon />}
                          label={job.status}
                          sx={{ backgroundColor: '#F3E5F5', color: '#7B1FA2', fontWeight: 500 }}
                        />
                        <Chip
                          icon={<MoneyIcon />}
                          label={`$${job.salary}`}
                          sx={{ backgroundColor: '#E8F5E9', color: '#2E7D32', fontWeight: 500 }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default AppliedJobsPage;