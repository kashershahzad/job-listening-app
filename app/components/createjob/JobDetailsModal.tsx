import { Modal, Box, Button, Typography } from '@mui/material';

interface JobDetailsModalProps {
  open: boolean;
  onClose: () => void;
  job: {
    id: number;
    title: string;
    description: string;
    category: string;
    location: string;
    salary: number;
  };
  onDelete: (id: number) => void;
  onUpdate: (job: any) => void;
}

export default function JobDetailsModal({ open, onClose, job, onDelete, onUpdate }: JobDetailsModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="bg-white p-6 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96">
        <Typography variant="h6" className="font-bold mb-4">
          {job.title}
        </Typography>
        <Typography>{job.description}</Typography>
        <Typography>Category: {job.category}</Typography>
        <Typography>Location: {job.location}</Typography>
        <Typography>Salary: ${job.salary}</Typography>
        <div className="mt-4 space-x-2">
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
        </div>
      </Box>
    </Modal>
  );
}