"use client"
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Container,
  Grid,
  Box,
  CircularProgress,
  Alert,
  Link,
  Paper,
  IconButton,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

interface Job {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  salary: number;
  postedById: number | null;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
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
  status: 'pending' | 'accepted' | 'declined';
  job: Job;
  user: User;
}

interface ApiResponse {
  success: boolean;
  applications: Application[];
}

const fetchApplications = async (): Promise<Application[]> => {
  const response = await fetch('/api/application');
  const data: ApiResponse = await response.json();

  if (data.success) {
    return data.applications;
  } else {
    throw new Error('Failed to fetch applications');
  }
};

const ApplicationList: React.FC = () => {
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);

  const { data: applications, isLoading, error } = useQuery<Application[], Error>({
    queryKey: ['applications'],
    queryFn: fetchApplications,
  });

  const handleViewDetails = (application: Application): void => {
    setSelectedApp(application);
    setIsDetailsOpen(true);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error.message}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {applications?.map((application) => (
          <Grid item xs={12} key={application.id}>
            <Card elevation={3}>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                  flexWrap="wrap"
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } 
                    }}
                  >
                    {application.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: '0.75rem', sm: '1rem' }, 
                      textAlign: { xs: 'left', sm: 'right' } 
                    }}
                  >
                    Application for: {application.job.title}
                  </Typography>
                </Box>
              </CardContent>

              <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<VisibilityIcon />}
                  onClick={() => handleViewDetails(application)}
                >
                  Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Application Details</Typography>
            <IconButton onClick={() => setIsDetailsOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedApp && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Paper elevation={0} sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Applicant Information
                    </Typography>
                    <Typography><strong>Name:</strong> {selectedApp.name}</Typography>
                    <Typography><strong>Email:</strong> {selectedApp.email}</Typography>
                    <Typography><strong>Phone:</strong> {selectedApp.phoneNumber}</Typography>
                    <Typography><strong>Qualification:</strong> {selectedApp.qualification}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper elevation={0} sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Job Information
                    </Typography>
                    <Typography><strong>Position:</strong> {selectedApp.job.title}</Typography>
                    <Typography><strong>Location:</strong> {selectedApp.job.location}</Typography>
                    <Typography><strong>Category:</strong> {selectedApp.job.category}</Typography>
                    <Typography><strong>Salary:</strong> ${selectedApp.job.salary.toLocaleString()}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper elevation={0} sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Resume
                    </Typography>
                    <Link
                      href={selectedApp.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                    </Link>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ApplicationList;