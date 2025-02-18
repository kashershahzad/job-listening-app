import { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import JobDetailsModal from './JobDetailsModal';

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
        <Card className="mb-4">
            <CardContent>
                <Typography variant="h6">{job.title}</Typography>
                <Typography variant="body2">{job.category}</Typography>
                <Button onClick={() => setIsModalOpen(true)}>Details</Button>
            </CardContent>
            <JobDetailsModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                job={job}
                onDelete={onDelete}
                onUpdate={onUpdate}
            />
            <Button variant="contained" color="primary" onClick={() => onUpdate(job)}>
                Update
            </Button>
            <Button variant="contained" color="error" onClick={() => onDelete(job.id)}>
                Delete
            </Button>
        </Card>
    );
}