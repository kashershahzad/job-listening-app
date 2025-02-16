'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation'; // Correct import for Next.js 13+
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment'; // Import InputAdornment

export function SignInForm(): React.JSX.Element {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>(''); // Changed from username to email
  const [password, setPassword] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  const handleRegisterClick = () => {
    router.push('/pages/auth/signup');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/auth/signin', { // Ensure this endpoint matches your backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Changed from username to email
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        const data = await response.json();
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Box component="span" className='text-lightblue font-bold text-4xl text-start'>
          Career Seeker
        </Box>
        <Typography variant="h6" className='text-gray-600'>Sign in</Typography>
      </Stack>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <FormControl>
            <InputLabel>Email</InputLabel> {/* Changed from Username to Email */}
            <OutlinedInput
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'gray',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'gray',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'gray',
                },
                '& .MuiInputBase-input': {
                  color: 'gray',
                },
              }}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  {showPassword ? (
                    <Visibility
                      cursor="pointer"
                      fontSize="medium"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <VisibilityOff
                      cursor="pointer"
                      fontSize="medium"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </InputAdornment>
              }
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'gray',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'gray',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'gray',
                },
                '& .MuiInputBase-input': {
                  color: 'gray',
                },
              }}
            />
          </FormControl>
          <Button type="submit" variant="contained">
            Sign in
          </Button>
          <Box mt={2}>
            <Typography variant="body2" align="center">
              Don't have an account?{' '}
              <Button onClick={handleRegisterClick} variant="text" color="primary">
                Register
              </Button>
            </Typography>
          </Box>
        </Stack>
      </form>
    </Stack>
  );
}