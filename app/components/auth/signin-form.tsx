'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation'; // Importing the useRouter hook
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Visibility, VisibilityOff } from '@mui/icons-material'; // MUI icons for show/hide password

export function SignInForm(): React.JSX.Element {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const router = useRouter(); // Using useRouter hook to navigate

  const handleRegisterClick = () => {
    router.push('/pages/auth/signup'); // Navigates to /auth/signup page
  };

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        
        <Box component="span" className='text-lightblue font-bold text-4xl text-start'>
          Career Seeker
        </Box>
        <Typography variant="h6" className='text-gray-600'>Sign in</Typography>
      </Stack>
      <form>
        <Stack spacing={2}>
          <FormControl>
            <InputLabel>Username</InputLabel>
            <OutlinedInput
              label="Username"
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
              endAdornment={
                showPassword ? (
                  <Visibility
                    cursor="pointer"
                    fontSize="medium"
                    onClick={(): void => {
                      setShowPassword(false);
                    }}
                  />
                ) : (
                  <VisibilityOff
                    cursor="pointer"
                    fontSize="medium"
                    onClick={(): void => {
                      setShowPassword(true);
                    }}
                  />
                )
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
          {/* Registration Link */}
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
