import { useState } from 'react';
import { TextField, Button } from '@mui/material';

interface JobFormData {
  id?: number;
  title: string;
  description: string;
  category: string;
  location: string;
  salary: number;
}

interface CreateJobFormProps {
  onSubmit: (formData: JobFormData) => void;
  onClose: () => void;
  initialData?: JobFormData;
}

export default function CreateJobForm({ onSubmit, onClose, initialData }: CreateJobFormProps) {
  const [formData, setFormData] = useState<JobFormData>(
    initialData || { title: '', description: '', category: '', location: '', salary: 0 }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextField
        fullWidth
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Salary"
        name="salary"
        type="number"
        value={formData.salary}
        onChange={handleChange}
      />
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outlined" onClick={onClose}>
          Close
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {initialData ? 'Update Job' : 'Create Job'}
        </Button>
      </div>
    </form>
  );
}