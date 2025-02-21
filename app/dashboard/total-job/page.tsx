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
  CircularProgress,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  Work as WorkIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Define types
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
const useUser = (): { user: User } => {
  return {
    user: { id: '1' },
  };
};

// Modal style
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

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [isApplyOpen, setIsApplyOpen] = useState<boolean>(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [qualification, setQualification] = useState<string>('');
  const { user } = useUser();
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // New state for loading

  // Fetch jobs on component mount
  useEffect(() => {
    fetch('/api/jobs')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch jobs');
        return response.json();
      })
      .then((data: { jobs: Job[] }) => {
        setJobs(data.jobs);
        setLoading(false);
        // Extract unique categories and locations
        const uniqueCategories = Array.from(new Set(data.jobs.map((job) => job.category)));
        const uniqueLocations = Array.from(new Set(data.jobs.map((job) => job.location)));
        setCategories(uniqueCategories);
        setLocations(uniqueLocations);
      })
      .catch((error: Error) => {
        console.error('Error fetching jobs:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setResumeFile(event.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!resumeFile || !selectedJob || !user?.id || !name || !email || !phoneNumber || !qualification) {
      alert('Please fill out all fields and ensure you are logged in.');
      return;
    }

    setIsSubmitting(true); // Start loading

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('job_id', selectedJob.id.toString());
    formData.append('user_id', user.id);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('qualification', qualification);

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
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  // Filter jobs based on selected category and location
  const filteredJobs = jobs.filter((job) => {
    return (
      (!selectedCategory || job.category === selectedCategory) &&
      (!selectedLocation || job.location === selectedLocation)
    );
  });

  // Loading state
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  // Error state
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
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<FilterIcon />}
            onClick={() => setIsFilterOpen(true)}
            sx={{
              background: 'linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)',
              borderRadius: 2,
              boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
            }}
          >
            Filter
          </Button>
        </Box>

        <Modal open={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
          <Box sx={modalStyle}>
            <IconButton
              aria-label="close"
              onClick={() => setIsFilterOpen(false)}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'grey.500',
                '&:hover': {
                  color: 'grey.700',
                },
              }}
            >
              <CloseIcon />
            </IconButton>

            <Typography variant="h4" component="h2" gutterBottom>
              Filter Jobs
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label="Category"
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Location</InputLabel>
                <Select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  label="Location"
                >
                  <MenuItem value="">All Locations</MenuItem>
                  {locations.map((location) => (
                    <MenuItem key={location} value={location}>
                      {location}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Modal>

        <Grid container spacing={3}>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
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
                          mb: 2,
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
            ))
          ) : (
            <Box sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
              <Typography variant="h6">No jobs available</Typography>
            </Box>
          )}
        </Grid>

        {/* Job Details Modal */}
        <Modal open={isDetailsOpen} onClose={() => setIsDetailsOpen(false)}>
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
        <Modal open={isApplyOpen} onClose={() => setIsApplyOpen(false)}>
          <Box sx={modalStyle}>
            <Typography variant="h4" component="h2" gutterBottom>
              Apply for {selectedJob?.title}
            </Typography>
            <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <TextField
                label="Name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Phone Number"
                value={phoneNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Qualification"
                value={qualification}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQualification(e.target.value)}
                fullWidth
                required
              />
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
                  disabled={isSubmitting}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                  }}
                >
                  {isSubmitting && <CircularProgress size={24} sx={{ color: 'white' }} />}
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setIsApplyOpen(false)}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Container>
    </Box>
  );
};

export default JobList;