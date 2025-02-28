'use client'

import React from 'react';
import { useUser } from '@/context/UserContext';
import { Typography, Paper, Grid, Button, Divider, Avatar, Box } from '@mui/material';
import { ExitToApp, Person, Email, Fingerprint } from '@mui/icons-material';

const ProfilePage: React.FC = () => {
  const { user, setUser } = useUser();

  if (!user) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
       
      }}>
        <Typography variant="h5" sx={{ color: '#3a506b', fontWeight: 500 }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  const handleSignOut = async () => {
    try {
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setUser(null); 
        window.location.href = '/signin'; 
      } else {
        console.error('Failed to sign out');
      }
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Box
      sx={{
        minHeight: '50vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px',
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: '100%',
          maxWidth: '900px',
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Grid
          container
          sx={{
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0B9AF7 0%, #1967A9 100%)',
            color: '#fff',
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ 
            position: 'absolute', 
            width: '300px', 
            height: '300px', 
            borderRadius: '50%', 
            background: 'rgba(255, 255, 255, 0.1)', 
            top: '-150px', 
            right: '-150px',
            zIndex: 0
          }} />
          <Avatar
            sx={{
              width: 90,
              height: 90,
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              color: 'white',
              fontSize: 32,
              fontWeight: 'bold',
              marginBottom: 3,
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
              border: '4px solid rgba(255, 255, 255, 0.3)',
              zIndex: 1
            }}
          >
            {getInitials(user.name)}
          </Avatar>
          
          <Typography variant="h4" sx={{ 
            fontWeight: 'bold', 
            mb: 2,
            zIndex: 1
          }}>
            {user.name}
          </Typography>         
          <Button
            variant="contained"
            startIcon={<ExitToApp />}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              color: '#3a51c5',
              fontWeight: 'bold',
              padding: '8px 20px',
              borderRadius: '10px',
              transition: 'all 0.2s ease',
              zIndex: 1,
              '&:hover': {
                backgroundColor: '#ffffff',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              },
            }}
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </Grid>
        <Divider orientation="horizontal" flexItem sx={{ backgroundColor: '#90caf9', display: { xs: 'block', sm: 'none' } }} />
        <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#90caf9', display: { xs: 'none', sm: 'block' } }} />
        <Grid container sx={{ 
          padding: '32px', 
          background: '#fff', 
          flex: 2 
        }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 'bold', 
            mb: 4, 
            color: '#1967A9',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Person sx={{ mr: 1, color: '#1967A9' }} />
            Profile Details
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ 
                display: 'flex',
                alignItems: 'flex-start',
                background: 'rgba(58, 81, 197, 0.03)',
                padding: 2,
                borderRadius: 2
              }}>
                <Fingerprint sx={{ 
                  color: '#1967A9', 
                  fontSize: 28,
                  mr: 2,
                  mt: 0.5
                }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ 
                    fontWeight: 'bold', 
                    color: '#1967A9',
                    mb: 0.5
                  }}>
                    User ID
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: '#333',
                    fontFamily: 'monospace',
                    background: 'rgba(58, 81, 197, 0.07)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    display: 'inline-block'
                  }}>
                    {user.id}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ 
                display: 'flex',
                alignItems: 'flex-start',
                mb: 2
              }}>
                <Person sx={{ 
                  color: '#1967A9', 
                  fontSize: 24,
                  mr: 2,
                  mt: 0.5
                }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ 
                    fontWeight: 'bold', 
                    color: '#1967A9',
                    mb: 0.5
                  }}>
                    Name
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#333' }}>
                    {user.name}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ 
                display: 'flex',
                alignItems: 'flex-start'
              }}>
                <Email sx={{ 
                  color: '#1967A9', 
                  fontSize: 24,
                  mr: 2,
                  mt: 0.5
                }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ 
                    fontWeight: 'bold', 
                    color: '#1967A9',
                    mb: 0.5
                  }}>
                    Email
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#333' }}>
                    {user.email}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProfilePage;