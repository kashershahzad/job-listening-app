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
    <form onSubmit={handleSubmit} className="space-y-4 bg-white/30 backdrop-blur-lg p-6 rounded-xl shadow-xl w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
        {initialData ? 'Update Job' : 'Create Job'}
      </h2>
      <TextField fullWidth label="Title" name="title" value={formData.title} onChange={handleChange} variant="outlined" className="bg-white/80 rounded-lg"/>
      <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} variant="outlined" className="bg-white/80 rounded-lg"/>
      <TextField fullWidth label="Category" name="category" value={formData.category} onChange={handleChange} variant="outlined" className="bg-white/80 rounded-lg"/>
      <TextField fullWidth label="Location" name="location" value={formData.location} onChange={handleChange} variant="outlined" className="bg-white/80 rounded-lg"/>
      <TextField fullWidth label="Salary" name="salary" type="number" value={formData.salary} onChange={handleChange} variant="outlined" className="bg-white/80 rounded-lg"/>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outlined" onClick={onClose} className="border-gray-500 text-gray-700 hover:bg-gray-100 transition-all duration-300 px-4 py-2 rounded-lg">
          Close
        </Button>
        <Button type="submit" variant="contained" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
          {initialData ? 'Update Job' : 'Create Job'}
        </Button>
      </div>
    </form>
  );
}