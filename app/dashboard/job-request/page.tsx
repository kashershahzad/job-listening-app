"use client"
import React, { useState, useEffect } from 'react';
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
  Chip,
  Link,
  Paper,
  IconButton,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
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

const ApplicationList: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/application');
      const data: ApiResponse = await response.json();
      
      if (data.success) {
        setApplications(data.applications);
      } else {
        throw new Error('Failed to fetch applications');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      console.error('Error fetching applications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleAccept = async (id: number): Promise<void> => {
  //   try {
  //     const response = await fetch(`/api/application/${id}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ status: 'accepted' }),
  //     });

  //     if (response.ok) {
  //       await fetchApplications();
  //     } else {
  //       throw new Error('Failed to accept application');
  //     }
  //   } catch (error) {
  //     console.error('Error accepting application:', error);
  //   }
  // };

  // const handleDecline = async (id: number): Promise<void> => {
  //   try {
  //     const response = await fetch(`/api/application/${id}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ status: 'declined' }),
  //     });

  //     if (response.ok) {
  //       await fetchApplications();
  //     } else {
  //       throw new Error('Failed to decline application');
  //     }
  //   } catch (error) {
  //     console.error('Error declining application:', error);
  //   }
  // };

  const handleViewDetails = (application: Application): void => {
    setSelectedApp(application);
    setIsDetailsOpen(true);
  };

  const getStatusColor = (status: string): "default" | "success" | "error" | "warning" => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'success';
      case 'declined':
        return 'error';
      default:
        return 'warning';
    }
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
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>      
      <Grid container spacing={3}>
        {applications.map((application) => (
          <Grid item xs={12} key={application.id}>
            <Card elevation={3}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">
                    {application.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Application for: {application.job.title}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body1">Status:</Typography>
                  <Chip 
                    label={application.status}
                    color={getStatusColor(application.status)}
                    size="small"
                  />
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
                {/* <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckCircleIcon />}
                  onClick={() => handleAccept(application.id)}
                  disabled={application.status !== 'pending'}
                >
                  Accept
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<CancelIcon />}
                  onClick={() => handleDecline(application.id)}
                  disabled={application.status !== 'pending'}
                >
                  Decline
                </Button> */}
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
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography><strong>Application Status:</strong></Typography>
                    <Chip 
                      label={selectedApp.status}
                      color={getStatusColor(selectedApp.status)}
                    />
                  </Box>
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