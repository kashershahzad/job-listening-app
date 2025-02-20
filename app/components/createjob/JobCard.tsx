import { useState } from "react";
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box, 
  Chip, 
  Stack,
  Avatar,
  Divider,
  IconButton
} from "@mui/material";
import {
  Work as WorkIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import JobDetailsModal from "./JobDetailsModal";

interface Job {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  salary: number;
}

interface JobCardProps {
  job: Job;
  onDelete: (id: number) => void;
  onUpdate: (job: Job) => void;
}

export default function JobCard({ job, onDelete, onUpdate }: JobCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card
      sx={{
        maxWidth: 800,
        height: '100%',
        borderRadius: 4,
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
        backgroundColor: 'white',
        position: 'relative',
        overflow: 'visible',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Job Icon */}
        <Box 
          sx={{ 
            position: 'absolute', 
            top: -20, 
            left: 24,
            zIndex: 1 
          }}
        >
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: 'primary.main',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
            }}
          >
            <WorkIcon sx={{ fontSize: 30 }} />
          </Avatar>
        </Box>

        {/* Job Title and Category */}
        <Box sx={{ mt: 3, mb: 2 }}>
          <Typography 
            variant="h5" 
            sx={{
              fontWeight: 700,
              fontSize: '1.5rem',
              lineHeight: 1.2,
              mb: 2,
              color: '#1a1a1a'
            }}
          >
            {job.title}
          </Typography>
          <Chip
            label={job.category}
            sx={{
              background: 'linear-gradient(45deg, #6366F1 30%, #818CF8 90%)',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.875rem',
              height: 32,
            }}
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Job Details */}
        <Stack spacing={2} sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationIcon sx={{ color: 'primary.main' }} />
            <Typography variant="body1" color="text.secondary">
              {job.location}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MoneyIcon sx={{ color: 'primary.main' }} />
            <Typography variant="body1" color="text.secondary">
              ${job.salary.toLocaleString()}
            </Typography>
          </Box>
        </Stack>

        {/* Action Buttons */}
        <Stack 
          direction="row" 
          spacing={1} 
          sx={{ 
            mt: 'auto',
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Button
            variant="contained"
            startIcon={<ViewIcon />}
            onClick={() => setIsModalOpen(true)}
            sx={{
              flex: 1,
              borderRadius: 2,
              textTransform: 'none',
              background: 'linear-gradient(45deg, #6366F1 30%, #818CF8 90%)',
              boxShadow: '0 2px 4px rgba(99, 102, 241, 0.4)',
            }}
          >
            View Details
          </Button>
          <IconButton
            color="warning"
            onClick={() => onUpdate(job)}
            sx={{ 
              bgcolor: 'warning.soft',
              '&:hover': { bgcolor: 'warning.light' }
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => onDelete(job.id)}
            sx={{ 
              bgcolor: 'error.soft',
              '&:hover': { bgcolor: 'error.light' }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      </CardContent>
      <JobDetailsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={job}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </Card>
  );
}