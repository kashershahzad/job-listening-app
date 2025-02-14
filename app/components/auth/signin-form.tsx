'use client';
import * as React from 'react';
import RouterLink from 'next/link';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';

export function SignInForm(): React.JSX.Element {
  const [showPassword, setShowPassword] = React.useState<boolean>();

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Box component="span" className='text-transparent bg-no-repeat bg-clip-text bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 font-bold text-4xl text-start' >
          Yomusick Dasboard
        </Box>
        <Typography variant="h4" className='text-white'>Sign in</Typography>
      </Stack>
      <form>
        <Stack spacing={2}>
          <FormControl>
            <InputLabel>Username</InputLabel>
            <OutlinedInput
              label="Username"
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                },
              }}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              endAdornment={
                showPassword ? (
                  <EyeIcon
                    cursor="pointer"
                    fontSize="var(--icon-fontSize-md)"
                    onClick={(): void => {
                      setShowPassword(false);
                    }}
                  />
                ) : (
                  <EyeSlashIcon
                    cursor="pointer"
                    fontSize="var(--icon-fontSize-md)"
                    onClick={(): void => {
                      setShowPassword(true);
                    }}
                  />
                )
              }
              label="Password"
              type={showPassword ? 'text' : 'password'}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                },
              }}
            />
          </FormControl>
          <Button type="submit" variant="contained">
            Sign in
          </Button>
          <div>
            <Link component={RouterLink} href="#" variant="subtitle2">
              Forgot password?
            </Link>
          </div>
        </Stack>
      </form>
    </Stack>
  );
}