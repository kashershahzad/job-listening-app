'use client'
import React, { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
  Modal,
  Box,
  IconButton,
  Paper,
  Stack,
  Divider
} from '@mui/material';
import {
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  AccessTime as TimeIcon,
  Close as CloseIcon,
  FiberManualRecord as DotIcon,
  Bookmark as BookmarkIcon,
  Send as SendIcon
} from '@mui/icons-material';

interface Job {
  id: number;
  title: string;
  company: string;
  description: string;
  category: string;
  location: string;
  salary: number;
  type: string;
  experience: string;
  postedDate: string;
}

const dummyJobs: Job[] = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "PakTech Solutions",
      description: "We are looking for a skilled Frontend Developer to build high-quality web applications using modern technologies.",
      category: "Development",
      location: "Lahore, Pakistan",
      salary: 300000,
      type: "Full-time",
      experience: "Senior Level",
      postedDate: "2 days ago"
    },
    {
      id: 2,
      title: "Software Engineer",
      company: "CodeCrafters",
      description: "Join our team as a Software Engineer and work on exciting projects using the latest tech stack.",
      category: "Development",
      location: "Karachi, Pakistan",
      salary: 250000,
      type: "Full-time",
      experience: "Mid Level",
      postedDate: "3 days ago"
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "DesignHub",
      description: "We are seeking a creative UI/UX Designer to craft engaging user experiences for web and mobile applications.",
      category: "Design",
      location: "Islamabad, Pakistan",
      salary: 200000,
      type: "Full-time",
      experience: "Mid Level",
      postedDate: "5 days ago"
    },
    {
      id: 4,
      title: "Digital Marketing Specialist",
      company: "BrandBoost",
      description: "Exciting opportunity for a Digital Marketing Specialist to manage campaigns and boost brand presence online.",
      category: "Marketing",
      location: "Faisalabad, Pakistan",
      salary: 180000,
      type: "Full-time",
      experience: "Mid Level",
      postedDate: "1 week ago"
    },
    {
      id: 5,
      title: "Mobile App Developer",
      company: "AppInnovators",
      description: "We need a talented Mobile App Developer proficient in Android and iOS development.",
      category: "Development",
      location: "Rawalpindi, Pakistan",
      salary: 280000,
      type: "Full-time",
      experience: "Senior Level",
      postedDate: "2 weeks ago"
    },
    {
      id: 6,
      title: "Network Engineer",
      company: "NetConnect",
      description: "Seeking a Network Engineer to maintain and optimize enterprise network infrastructure.",
      category: "IT & Networking",
      location: "Peshawar, Pakistan",
      salary: 220000,
      type: "Full-time",
      experience: "Mid Level",
      postedDate: "3 weeks ago"
    }
  ];
  
const JobList: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: '',
      py: 6 
    }}>
      <Container maxWidth="lg">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <Typography variant="h2" sx={{ 
            color: 'primary.dark',
            fontWeight: 700,
            mb: 2
          }}>
            Featured Job Positions
          </Typography>
          <Typography variant="h6" sx={{ color: 'black' }}>
            Discover your next career opportunity
          </Typography>
        </motion.div>

        <Grid container spacing={3}>
          {dummyJobs.map((job) => (
            <Grid item xs={12} md={6} lg={4} key={job.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card sx={{
                  height: '100%',
                  borderRadius: 4,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                  }
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Chip 
                        label={job.type}
                        color="primary"
                        variant="outlined"
                        size="small"
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                      }}>
                        <TimeIcon fontSize="small" />
                        {job.postedDate}
                      </Typography>
                    </Box>

                    <Typography variant="h6" gutterBottom>
                      {job.title}
                    </Typography>

                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                      <BusinessIcon color="primary" fontSize="small" />
                      <Typography color="primary.main">
                        {job.company}
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                      <Typography variant="body2" sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                      }}>
                        <LocationIcon fontSize="small" color="action" />
                        {job.location}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                      }}>
                        <MoneyIcon fontSize="small" color="action" />
                        ${job.salary.toLocaleString()}
                      </Typography>
                    </Stack>

                    <Button 
                      variant="contained"
                      fullWidth
                      onClick={() => setSelectedJob(job)}
                      sx={{
                        background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                        borderRadius: 2,
                        textTransform: 'none',
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

        <Modal
        open={Boolean(selectedJob)}
        onClose={() => setSelectedJob(null)}
        aria-labelledby="job-modal-title"
        aria-describedby="job-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: {
            xs: '90%',
            sm: '80%',
            md: '600px'
          },
          maxHeight: '80vh',
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: 24,
          overflow: 'hidden'
        }}>
          {selectedJob && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Box sx={{ 
                position: 'relative',
                bgcolor: 'primary.main',
                color: 'white',
                p: 2 
              }}>
                <IconButton 
                  onClick={() => setSelectedJob(null)}
                  sx={{ 
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: 'white'
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" id="job-modal-title">
                  {selectedJob.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <BusinessIcon sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="subtitle1">
                    {selectedJob.company}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ 
                p: 2,
                maxHeight: 'calc(80vh - 120px)',
                overflowY: 'auto'
              }}>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body2">{selectedJob.location}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <MoneyIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body2">
                        ${selectedJob.salary.toLocaleString()}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <WorkIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body2">{selectedJob.type}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body2">{selectedJob.experience}</Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Typography variant="h6" gutterBottom>
                  Job Description
                </Typography>
                <Typography variant="body2" paragraph>
                  {selectedJob.description}
                </Typography>
              </Box>
            </motion.div>
          )}
        </Box>
      </Modal>
      </Container>
    </Box>
  );
};

export default JobList;