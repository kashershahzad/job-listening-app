/* eslint-disable some-rule -- explanation of why this rule is disabled */

import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <Box
      sx={{
        display: { xs: 'flex', lg: 'grid' },
        flexDirection: 'column',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '100%',
        backgroundColor: 'white',
      }}
    >
      <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', backgroundColor: 'white' }}>
        <Box sx={{ p: 3 }}>
      
            <Box
              component="img"
              alt="Widgets"
              src="assests/logo.png"
              sx={{ height: 'auto', width: '100%', maxWidth: '100px' }}
            />
          </Box>
     
        <Box sx={{ alignItems: 'center', display: 'flex', flex: '1 1 auto', justifyContent: 'center', p: 3 }}>
          <Box sx={{ maxWidth: '450px', width: '100%' }}>{children}</Box>
        </Box>
      </Box>
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'white', // Set white background for the right side
          display: { xs: 'none', lg: 'flex' },
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Stack spacing={1}>
          <Stack spacing={1}>
          </Stack>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              component="img"
              alt="Widgets"
              src="\assests\sign-in.avif"
              sx={{ height: 'auto', width: '100%', maxWidth: '500px' }}
              className='mt-5'
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}