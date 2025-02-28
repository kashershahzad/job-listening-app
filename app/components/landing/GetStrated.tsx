'use client'

import React from 'react';
import { useRouter } from 'next/navigation'; 
import { Card, CardContent, Typography, Button } from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const FeatureCard = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 lg:mx-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full h-full"
      >
        <Card 
          elevation={4}
          className='border border-lightblue'
          sx={{
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            position: 'relative',
            overflow: 'visible',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -2,
              left: -2,
              right: -2,
              bottom: -2,
              background: '',
              zIndex: -1,
              borderRadius: 4.5,
              opacity: 0.5,
            }
          }}
        >
          <CardContent sx={{ p: 8, textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Typography 
                variant="h3" 
                component="h1"
                className="text-darkblue"
                sx={{ 
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '2rem', md: '2.5rem' }
                }}
              >
                Transform Your Digital Experience
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Typography 
                variant="body1"
                className="text-gray-600"
                sx={{ 
                  mb: 4,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.8
                }}
              >
                Embark on a journey to revolutionize your digital presence. Our platform combines cutting-edge technology with intuitive design to help you create stunning experiences that captivate your audience. Join thousands of satisfied users who have already transformed their online presence.
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 items-center justify-center"
            >
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={() => router.push('/signin')}
                sx={{
                  background: 'linear-gradient(45deg, #4F46E5 30%, #06B6D4 90%)',
                  borderRadius: '12px',
                  padding: '12px 32px',
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(79, 70, 229, 0.6)',
                  }
                }}
              >
                Get Started
              </Button>
              
              <Typography 
                variant="body2" 
                className="text-gray-500"
                sx={{ fontStyle: 'italic' }}
              >
                Join over 10,000+ happy users
              </Typography>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default FeatureCard;