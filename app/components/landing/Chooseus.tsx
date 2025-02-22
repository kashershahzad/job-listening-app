import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';

const advantages = [
  [
    {
      imageUrl: 'assests/Management.png',
      title: 'Verified Companeies',
      description: 'We partner with trusted and verified companies',
    },
    {
      imageUrl: 'assests/Favourite.png',
      title: 'Great Environment',
      description: 'We prioritize workplaces that foster a positive',
    },
  ],
  [
    {
      imageUrl: 'assests/Communicative.png',
      title: 'Personalized Support',
      description: 'Our team provides personalized guidance and support',
    },
    {
      imageUrl: 'assests/Collaborative.png',
      title: 'Diverse Opportunities',
      description: 'We connect you with a wide range of job opportunities',
    },
  ],
];

export default function Advantage() {
  return (
    <Box className="bg-gray-50 py-20 mb-24 sm:mb-18 xl:mb-16">
      <Container>
        <h2 className="text-5xl text-darkblue text-center font-bold">
          Why Choose Us
        </h2>
        <p className="font-light text-lg text-theme-light-Blue text-center mb-12 sm:mb-5 xl:mb-0">
          Why you should choose us to handle your project.
        </p>
        <Grid container spacing={4}>
          {advantages.map((column, colIndex) => (
            <Grid item xs={12} sm={6} key={colIndex}>
              {column.map((item, index) => (
                <Box
                  key={index}
                  className="bg-white flex flex-row items-center p-3 my-6 mx-3 sm:my-7 sm:mx-3 xl:my-14 xl:mx-7 rounded-2xl shadow-xl border border-lightblue transform transition duration-500 hover:scale-105"
                >
                  <img src={item.imageUrl} alt={item.title} className="w-1/3" />
                  <Box className="flex-col pl-5">
                    <h3 className="text-darkblue text-2xl font-bold">
                      {item.title}
                    </h3>
                    <p className="font-light text-theme-light-Blue text-sm">
                      {item.description}
                    </p>
                  </Box>
                </Box>
              ))}
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}